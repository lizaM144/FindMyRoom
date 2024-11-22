import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
  ActivityIndicator,
} from "react-native";
import BASE_URL from "../../apiConfig.js";
import Icon from "react-native-vector-icons/Ionicons";

const PropertyDetailScreen = ({ navigation, route }) => {
  const { propertyId } = route.params; // Assuming propertyId is passed
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // console.log("propertyId from route.params:", propertyId);
    // Fetch property details by ID
    const fetchPropertyDetails = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/properties/${propertyId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch property details");
        }
        const data = await response.json();
        setProperty(data);
      } catch (error) {
        console.error("Error fetching property details:", error);
        alert("Failed to load property details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [propertyId]);

  const imageUri =
    "https://nepalhomesearch.com/wp-content/uploads/2023/06/Baluwatar-apartments-382.jpg";

  const handleContactPress = () => {
    if (property?.phone_number) {
      const url = `whatsapp://send?phone=+977${property.phone_number}&text=Hello, I am interested in your property.`;
      Linking.openURL(url).catch(() => {
        alert("Make sure WhatsApp is installed on your device");
      });
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#6A8DB5" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!property) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load property details.</Text>
      </View>
    );
  }

  const dotColor = "Available" === "Available" ? "green" : "red"; // Assuming availability logic

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.detailContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {property.title} for Rent in {property.city}, {property.location}
          </Text>
        </View>
        <Text style={styles.price}>Rs. {property.price} / per month</Text>
        <View style={styles.locationInfo}>
          <Icon name="location-outline" size={24} color="#000" />
          <Text style={styles.location}>{property.location}</Text>
        </View>
        <View style={styles.availabilityInfo}>
          <Icon name="ellipse" size={16} color={dotColor} />
          <Text style={styles.availability}>Available</Text>
        </View>
        <Text style={styles.propertyInfo}>Type: {property.houseType}</Text>
        <Text
          style={styles.link}
          onPress={() => Linking.openURL("https://www.google.com/maps")}
        >
          View on Google Maps
        </Text>
        <View style={styles.underline} />
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{property.description}</Text>
        <Text style={styles.contact}>Contact: {property.phone_number}</Text>

        <View style={styles.underline} />
        <Text style={styles.sectionTitle}>Facilities</Text>
        <View style={styles.facilitiesList}>
          <Text style={styles.facility}>✓ 1 Room</Text>
          <Text style={styles.facility}>✓ 24/7 Water facility</Text>
          <Text style={styles.facility}>✓ Parking Available</Text>
          <Text style={styles.facility}>✓ 2nd Floor</Text>
        </View>

        <TouchableOpacity
          style={styles.contactButton}
          onPress={handleContactPress}
        >
          <Text style={styles.contactButtonText}>Contact</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfdfd",
  },
  backButton: {
    position: "absolute",
    top: 12,
    left: 10,
    zIndex: 1,
    paddingTop: 30,
  },
  image: {
    width: "100%",
    height: 375,
  },
  detailContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -30,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "400",
    color: "#1048b4",
    lineHeight: 28,
    opacity: 0.7,
    flex: 1,
    marginRight: 8,
  },
  price: {
    fontSize: 18,
    color: "#2675ec",
    marginVertical: 5,
  },
  locationInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    opacity: 0.8,
  },
  location: {
    fontSize: 16,
    color: "#000000",
    marginLeft: 5,
  },
  availabilityInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    opacity: 0.8,
  },
  availability: {
    fontSize: 16,
    color: "#000000",
    marginLeft: 5,
  },
  propertyInfo: {
    fontSize: 14,
    color: "#000000",
    marginVertical: 5,
    opacity: 0.6,
  },
  link: {
    fontSize: 14,
    color: "#000000",
    textDecorationLine: "underline",
    opacity: 0.8,
  },
  underline: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "400",
    color: "#256dcd",
    marginTop: 10,
    opacity: 0.8,
  },
  description: {
    fontSize: 14,
    color: "#808080",
    lineHeight: 20,
    marginVertical: 5,
  },
  contact: {
    fontSize: 14,
    color: "#808080",
    marginVertical: 5,
  },
  facilitiesList: {
    marginVertical: 10,
  },
  facility: {
    fontSize: 14,
    color: "#000000",
    opacity: 0.6,
  },
  contactButton: {
    marginTop: 20,
    backgroundColor: "#6786ab",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
  },
  contactButtonText: {
    fontSize: 18,
    color: "#fff",
  },
});

export default PropertyDetailScreen;
