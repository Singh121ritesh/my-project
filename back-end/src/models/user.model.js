import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; // Make sure to install bcrypt if you want to use it for password hashing

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    // Email/OTP verification flag (you can also store token if needed)
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    // createdAt/updatedAt will be generated automatically
    timestamps: true,
  }


);
userSchema.pre('save', async function () {
  // You can add password hashing here if needed (e.g., using bcrypt)
  if (!this.isModified('password')) {
    return;
  }
  this.password = await  bcrypt.hash(this.password, 10); // Placeholder - replace with actual hashing logic
  // For example:   
    // if (this.isModified('password')) {
    //   const salt = await bcrypt.genSalt(10);
    //   this.password = await bcrypt.hash(this.password, salt);
    // }
});
userSchema.methods.comparePassword = async function (candidatePassword) {
  // Implement password comparison logic (e.g., using bcrypt)
  return await bcrypt.compare(candidatePassword, this.password); // Placeholder - replace with actual comparison logic
  // For example:
    // return await bcrypt.compare(candidatePassword, this.password);
};
/* 

*/
// If you want to ensure index consistency

const User = mongoose.model('User', userSchema);

export default User;

