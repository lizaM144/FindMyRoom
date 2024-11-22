import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // role: { type: String, enum: ["landlord", "tenant"], required: true },
  otp: { type: String },
  otpExpires: { type: Date },
});
export default mongoose.model("User", userSchema);
