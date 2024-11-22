import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import BottomNavigation from "../../Components/BottomNavigation";

const ResultsScreen = ({ route, navigation }) => {
  const { keyword, selectedLocation, area, properties } = route.params || {};
  const [selectedSort, setSelectedSort] = useState("Price(low to high)");

  const sortedProperties =
    selectedSort === "Price(low to high)"
      ? [...properties].sort((a, b) => a.price - b.price)
      : [...properties].sort((a, b) => b.price - a.price);

  const openMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      selectedLocation
    )}`;
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  const viewPropertyDetails = (listing) => {
    console.log("Listing object:", listing); // Add this line to see the full object
    if (listing && listing._id) {
      navigation.navigate("PropertyDetail", {
        propertyId: listing._id,
        image: listing.image,
        title: listing.title,
        location: listing.location,
        price: listing.price,
        availability: listing.status,
      });
    } else {
      console.error("Invalid property object or _id missing");
    }
  };

  const handleSortChange = (sortType) => {
    setSelectedSort(sortType);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search Results</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={openMaps}>
            <Icon
              name="map-outline"
              size={24}
              color="#FFFFFF"
              style={styles.iconSpacing}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.filtersContainer}>
        <View style={styles.filter}>
          <Icon name="location-outline" size={16} color="#456f96" />
          <Text style={styles.filterText}>{selectedLocation}</Text>
        </View>
        <View style={styles.filter}>
          <Icon name="location" size={16} color="#456f96" />
          <Text style={styles.filterText}>{area}</Text>
        </View>
        <View style={styles.filter}>
          <Icon name="search" size={16} color="#456f96" />
          <Text style={styles.filterText}>{keyword}</Text>
        </View>
      </View>
      {/* Add Sort Buttons */}
      <View style={styles.sortContainer}>
        <TouchableOpacity
          onPress={() => handleSortChange("Price(low to high)")}
          style={styles.sortOption}
        >
          <Text
            style={[
              styles.sortText,
              selectedSort === "Price(low to high)" && styles.selectedSort,
            ]}
          >
            Price (Low to High)
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleSortChange("Price(high to low)")}
          style={styles.sortOption}
        >
          <Text
            style={[
              styles.sortText,
              selectedSort === "Price(high to low)" && styles.selectedSort,
            ]}
          >
            Price (High to Low)
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsTitle}>
            {sortedProperties.length} Results - Showing '{selectedSort}'
          </Text>
        </View>

        {sortedProperties.map((listing) => (
          <TouchableOpacity
            key={listing._id}
            style={styles.listingContainer}
            onPress={() => viewPropertyDetails(listing)}
          >
            <Image
              source={{
                uri:
                  listing.image ||
                  "https://nepalhomesearch.com/wp-content/uploads/2023/06/Baluwatar-apartments-382.jpg",
              }}
              style={styles.image}
            />
            <View style={styles.detailsContainer}>
              <Text style={styles.title}>{listing.title}</Text>
              <Text style={styles.location}>{listing.location}</Text>
              <Text style={styles.price}>Rs {listing.price}</Text>
              <Text style={styles.availability}>
                {listing.status === "available" ? "Not Available" : "Available"}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <BottomNavigation navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dde5ef",
  },
  header: {
    height: 80,
    backgroundColor: "#6A8DB5",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: 1,
    paddingTop: 40,
    paddingHorizontal: 10,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
  iconSpacing: {
    marginRight: 15,
  },
  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f0f4f8",
    paddingVertical: 10,
  },
  filter: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#456f96",
  },
  scrollContent: {
    paddingBottom: 70,
  },
  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginVertical: 20,
  },
  resultsTitle: {
    fontSize: 20,
    color: "#375672",
  },
  listingContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 15,
    marginBottom: 15,
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  location: {
    marginLeft: 5,
    fontSize: 16,
    color: "#456f96",
  },
  price: {
    fontSize: 16,
    color: "#898383",
  },
  status: {
    fontSize: 16,
  },
  available: {
    color: "green",
  },
  booked: {
    color: "red",
  },
  sortContainer: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    backgroundColor: "#c1d9f9",
    borderRadius: 20,
    padding: 15,
    zIndex: 1,
  },
  sortHeader: {
    fontSize: 20,
    color: "#31506d",
    fontWeight: "bold",
    marginBottom: 10,
  },
  sortOption: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  sortText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#1c3a56",
  },
  selectedSort: {
    fontWeight: "bold",
    color: "#6A8DB5",
  },
  saveSearchContainer: {
    position: "absolute",
    top: 70,
    right: 15,
    backgroundColor: "#519db5",
    borderRadius: 10,
    padding: 10,
    zIndex: 2,
  },
  saveSearchButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  saveSearchText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#152946",
  },
});

export default ResultsScreen;
