import express from "express";
import {
  getProperties,
  getPropertyById,
  searchProperties,
} from "../controllers/propertyController.js";

const router = express.Router();

router.get("/", getProperties); // Get all properties
router.get("/:id", getPropertyById); // Route to get property details by id
router.post("/search", searchProperties); // Search properties by location and area

export default router;
