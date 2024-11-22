import mongoose from "mongoose";
const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  city: { type: String, required: true },
  location: { type: String, required: true },
  houseType: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  phone_number: { type: String, required: true },
});

export default mongoose.model("Property", propertySchema);
