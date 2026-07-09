import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service.js";
import e from "express";


export async function register(req, res) {
    const { username, email, password } = req.body;

    const isUserAlreadyExist = await User.findOne({ $or: [{ email }, { username }] });
    if (isUserAlreadyExist) {
        return res.status(400).json({ message: "User with this email or username already exists", 
        success: false,
        err: "User with this email or username already exists"
        });
        
    }
    const newUser = new User({ username, email, password });
    await newUser.save();

    const emailVerificationToken = jwt.sign({
        email: newUser.email,
    }, process.env.JWT_SECRET,);

    await sendEmail({
        to: email,
        subject: "Welcome to Perplexity Chat App",
        html: `<p>Hi ${username},</p><p>Thank you for registering at Perplexity Chat App! We're excited to have you on board.</p><p>Best regards,<br>Perplexity Chat Team</p>
        <a href ="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Click here to verify your email</a>`,

    });

    res.status(201).json({
        message: "User registered successfully",
        success: true,
        user: {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
        },
    });


}
export async function verifyEmail(req, res) {
  try {
    // Get token from query
    const { token } = req.query;

    // Check token exists
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token is required",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const user = await User.findOne({
      email: decoded.email,
    });

    // User not found
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Already verified
    if (user.isEmailVerified) {
      return res.status(400).send(`
        <h2>Email already verified</h2>
        <a href="http://localhost:3000/login">
          Go to Login
        </a>
      `);
    }

    // Verify email
    user.isEmailVerified = true;

    await user.save();

    // Success HTML
    const html = `
      <div style="
        font-family: Arial;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
      ">
        <h1 style="color: green;">
          Email Verified Successfully ✅
        </h1>

        <p>
          Your account has been verified.
          You can now login.
        </p>

        <a 
          href="http://localhost:3000/login"
          style="
            padding: 10px 20px;
            background: black;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 10px;
          "
        >
          Go to Login
        </a>
      </div>
    `;

    return res.status(200).send(html);

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Invalid or expired token",
      error: error.message,
    });
  }
}

export async function login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Invalid email or password", success: false, err: "User not found" });
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
        return res.status(400).json({ message: "Invalid email or password", success: false, err: "Incorrect password" });
    }
    if (!user.isEmailVerified) {
        return res.status(400).json({ message: "Please verify your email before logging in", success: false, err: "Email not verified" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.cookie("token", token)
    res.status(200).json({
        message: "Login successful",
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
        }
    });


}

export async function getMe(req, res) {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
}