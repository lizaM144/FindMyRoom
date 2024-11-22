import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import BottomNavigation from "../../Components/BottomNavigation";
import BASE_URL from "../../apiConfig.js";

const SearchScreen = ({ navigation }) => {
  const [keyword, setKeyword] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [area, setArea] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleResetPress = () => {
    setKeyword("");
    setSelectedLocation("");
    setArea("");
    setShowDropdown(false);
  };

  const handleSearchPress = () => {
    fetch(`${BASE_URL}/api/properties/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selectedLocation,
        area: area.trim(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        navigation.navigate("Results", {
          keyword,
          selectedLocation,
          area,
          properties: data,
        });
      })
      .catch((error) => console.error("Error:", error));
  };

  const locations = ["Kathmandu", "Lalitpur", "Bhaktapur"]; // Can be dynamically fetched if needed

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Search By</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <TouchableOpacity
            style={styles.locationInput}
            onPress={() => setShowDropdown(!showDropdown)}
          >
            <Icon name="location-outline" size={24} color="#000" />
            <Text style={styles.locationText}>
              {selectedLocation || "Choose the location"}
            </Text>
          </TouchableOpacity>
          {showDropdown && (
            <View style={styles.dropdown}>
              {locations.map((location) => (
                <TouchableOpacity
                  key={location}
                  onPress={() => {
                    setSelectedLocation(location);
                    setShowDropdown(false);
                  }}
                  style={styles.dropdownItem}
                >
                  <Text style={styles.dropdownText}>{location}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Area</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="For eg. Pulchowk, Thimi, Kirtipur"
              value={area}
              onChangeText={setArea}
              style={styles.textInput}
            />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Keyword</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Please Enter Keyword"
              value={keyword}
              onChangeText={setKeyword}
              style={styles.textInput}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetPress}
          >
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearchPress}
          >
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomNavigation navigation={navigation} />
    </KeyboardAvoidingView>
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
  },
  scrollContent: {
    paddingBottom: 70,
  },
  section: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "400",
    color: "#456f96",
    marginBottom: 10,
  },
  propertyTypeContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  propertyType: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
    backgroundColor: "#CCCCCC",
  },
  selectedPropertyType: {
    backgroundColor: "#456f96",
  },
  propertyTypeText: {
    fontSize: 16,
  },
  selectedText: {
    color: "#fff",
  },
  text: {
    color: "#000",
  },
  locationInput: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  locationText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#456f96",
  },
  dropdown: {
    backgroundColor: "#EDEDED",
    borderRadius: 5,
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: "#000",
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
  },
  textInput: {
    fontSize: 16,
    color: "#000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
  },
  resetButton: {
    backgroundColor: "#c5d0f5",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  searchButton: {
    backgroundColor: "#6786ab",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default SearchScreen;
