import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import BASE_URL from "../../apiConfig.js";
import BottomNavigation from "../../Components/BottomNavigation"; // Ensure this path is correct

const HomeScreen = ({ navigation }) => {
  const [roomData, setRoomData] = useState([]);
  const [loading, setLoading] = useState(true);
  const defaultImage =
    "https://nepalhomesearch.com/wp-content/uploads/2023/06/Baluwatar-apartments-382.jpg";

  // Fetch properties from the backend
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/properties`);
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();
        // Ensure every property has an image
        const processedData = data.map((room) => ({
          ...room,
          image: room.image || defaultImage, // Use default image if no image exists
        }));
        setRoomData(processedData);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const HeaderBar = () => {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.locationContainer}>
          <Text style={styles.currentLocation}>Current Location</Text>
          <View style={styles.locationDetail}>
            <Icon
              name="location-outline"
              size={20}
              style={styles.locationIcon}
            />
            <Text style={styles.city}>Lalitpur</Text>
          </View>
        </View>
      </View>
    );
  };

  const RoomDetailCard = ({ room }) => {
    const { image, title, location, price, availability } = room;
    const dotColor = availability === "Available" ? "red" : "green";

    const handlePress = () => {
      navigation.navigate("PropertyDetail", {
        propertyId: room._id,
        image,
        title,
        location,
        price,
        availability,
      });
    };

    return (
      <TouchableOpacity style={styles.cardContainer} onPress={handlePress}>
        <Image source={{ uri: image }} style={styles.cardImage} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.locationContainerCard}>
            <Icon name="location-outline" size={14} style={styles.icon} />
            <Text style={styles.location}>{location}</Text>
          </View>
          <Text style={styles.price}>Rs {price}/month</Text>
          <View style={styles.availabilityContainer}>
            <Icon
              name="ellipse"
              size={10}
              style={[styles.dotIcon, { color: dotColor }]}
            />
            <Text style={styles.availability}>{availability} Available</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6A8DB5" />
        <Text>Loading properties...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <HeaderBar />

      <View style={styles.accommodationHeader}>
        <Text style={styles.accommodationTitle}>Accommodations nearby</Text>
        {/* <Text style={styles.seeAll}>See All {">"}</Text> */}
      </View>
      <ScrollView style={styles.scrollView}>
        {roomData.map((room, index) => (
          <RoomDetailCard key={index} room={room} />
        ))}
      </ScrollView>
      <BottomNavigation />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dde5ef",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6A8DB5",
    height: 90,
    paddingHorizontal: 20,
    width: "100%",
  },
  locationContainer: {
    flex: 1,
    justifyContent: "center",
  },
  currentLocation: {
    fontSize: 20,
    color: "#FFFFFF",
    paddingTop: 30,
    fontWeight: "bold",
  },
  locationDetail: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {
    marginRight: 5,
    color: "#FFFFFF",
  },
  city: {
    fontSize: 17,
    color: "#FFFFFF",
  },
  accommodationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  accommodationTitle: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000000",
  },
  seeAll: {
    fontSize: 14,
    color: "#2D5DA7",
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 15,
  },
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  cardImage: {
    width: 150,
    height: 110,
    borderRadius: 10,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "400",
    color: "#000",
  },
  locationContainerCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: "#898383",
    marginBottom: 5,
    marginLeft: 5,
  },
  price: {
    fontSize: 14,
    color: "#898383",
    marginBottom: 5,
  },
  availabilityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dotIcon: {
    marginRight: 5,
  },
  availability: {
    fontSize: 14,
    color: "#898383",
  },
  icon: {
    color: "#000",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#dde5ef",
  },
});

export default HomeScreen;
