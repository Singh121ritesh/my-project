import { Router } from "express";
import { register, verifyEmail, login ,getMe} from "../controllers/auth.controller.js";
import { registerValidator, loginValidator} from "../validators/auth.validator.js";
import { authUser } from "../middleware/auth.middleware.js";

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body {username: string, email: string, password: string}
 * @returns {user:{id, username, email}, token: string} on success
 */

authRouter.post("/register", registerValidator, register);

authRouter.get("/verify-email",verifyEmail);

/**
 * post /api/auth/login
 * @desc Login user and return JWT token
 * @access Public
 * @body {email: string, password: string}
 * @returns {user:{id, username, email}, token: string} on success
 */

authRouter.post("/login", loginValidator, login);

/**
 *  @route Get /api/auth/get-me
 * @desc Get current logged in user details
 * @access Private
 */
authRouter.get("/get-me", authUser, getMe);

export default authRouter;
