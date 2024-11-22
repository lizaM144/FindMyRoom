import Property from "../models/property.js";

// Get all properties
export const getProperties = async (req, res) => {
  try {
    const properties = await Property.find(); // Fetch all properties
    res.status(200).json(properties); // Send properties as JSON
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Failed to fetch properties" });
  }
};

// Get a property by ID
export const getPropertyById = async (req, res) => {
  console.log("Request received for ID:", req.params.id);
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    console.error("Error fetching property:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const searchProperties = async (req, res) => {
  const { selectedLocation, area } = req.body;

  try {
    const query = {};

    // Add city condition if provided
    if (selectedLocation) {
      query.city = selectedLocation;
    }

    // Add location condition as a case-insensitive regex
    if (area) {
      query.location = { $regex: area, $options: "i" };
    }

    // Fetch properties based on the constructed query
    const properties = await Property.find(query);

    res.status(200).json(properties);
  } catch (error) {
    console.error("Error searching properties:", error);
    res.status(500).json({ message: "Error searching properties" });
  }
};
