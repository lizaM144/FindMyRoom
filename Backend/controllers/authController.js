import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { generateOtp, sendOtp } from "../utils/otpUtils.js";

// Registration
export const register = async (req, res) => {
  const { fullName, phone, email, password } = req.body;

  try {
    let user = await User.findOne({ $or: [{ email }, { phone }] });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password and save the user
    user = new User({
      fullName,
      phone,
      email,
      password: await bcrypt.hash(password, 10),
      // role,
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login
export const login = async (req, res) => {
  const { phoneEmail, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: phoneEmail }, { phone: phoneEmail }],
    });
    // if (!user || user.role !== role) {
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const { password: pass, ...rest } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Request OTP for Password Reset
export const requestOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const otp = generateOtp();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    await sendOtp(email, otp);

    res.status(200).json({ message: "OTP sent to your email address" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ message: "An error occurred while sending OTP" });
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP or user not found" });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordCriteria = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}/;
    if (!passwordCriteria.test(newPassword)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one number",
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.otp = null;
    user.otpExpires = null;

    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// export const getProfile = async (req, res) => {
//   try {
//     const userId = req.user.id; // Assuming you are using middleware to attach the user to the request
//     const user = await User.findById(userId).select("fullName profilePicture");

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
