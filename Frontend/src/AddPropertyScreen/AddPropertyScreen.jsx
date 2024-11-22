import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  ScrollView,
  Switch,
  Alert,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import BottomNavigation from "../Components/BottomNavigation";
import Icon from "react-native-vector-icons/Ionicons";

export default function AddPropertyScreen({ navigation }) {
  const [propertyTitle, setPropertyTitle] = useState("");
  const [description, setDescription] = useState("");
  const [availability, setAvailability] = useState("");
  const [rentPrice, setRentPrice] = useState("");
  const [location, setLocation] = useState("");
  const [isTypeModalVisible, setTypeModalVisible] = useState(false);
  const [isConsentChecked, setConsentChecked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle media upload
  const pickImage = async () => {
    let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (result.granted === false) {
      Alert.alert(
        "Permission Denied",
        "You need to enable permissions for the media library in your device settings.",
        [{ text: "OK" }]
      );
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      setSelectedImage(pickerResult.uri);
    }
  };

  const handleRentPriceChange = (text) => {
    if (/^\d*$/.test(text)) {
      setRentPrice(text);
    } else {
      Alert.alert("Rent price must only contain numbers.");
    }
  };

  const toggleTypeModal = () => {
    setTypeModalVisible(!isTypeModalVisible);
  };

  // Check if all required fields are filled
  const isFormValid = propertyTitle && rentPrice && availability;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Icon name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Add Property</Text>
        </View>

        {/* Scrollable Form Fields */}
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Text style={styles.label}>Property Title*</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your property title"
            value={propertyTitle}
            onChangeText={setPropertyTitle}
          />

          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />

          <Text style={styles.label}>Availability*</Text>
          <TouchableOpacity style={styles.input} onPress={toggleTypeModal}>
            <Text>{availability || "Select"}</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Rent Price*</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the price"
            value={rentPrice}
            onChangeText={handleRentPriceChange}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Location</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter the location"
            value={location}
            onChangeText={setLocation}
            keyboardType="url"
          />

          <Text style={styles.label}>Select and Upload Media</Text>
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Text style={styles.uploadText}>Upload Media</Text>
          </TouchableOpacity>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              style={styles.uploadedImage}
            />
          ) : null}

          {/* Consent */}
          <View style={styles.consentContainer}>
            <Switch
              value={isConsentChecked}
              onValueChange={setConsentChecked}
            />
            <Text style={styles.consentText}>
              I consent to having this website store my submitted information,
              read more information.
            </Text>
          </View>
        </ScrollView>

        {/* Modal for Selecting Availability */}
        <Modal visible={isTypeModalVisible} transparent={true}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalHeader}>Select Availability</Text>
              <TouchableOpacity
                onPress={() => {
                  setAvailability("Available");
                  toggleTypeModal();
                }}
              >
                <Text style={styles.modalOption}>Available</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setAvailability("Booked");
                  toggleTypeModal();
                }}
              >
                <Text style={styles.modalOption}>Booked</Text>
              </TouchableOpacity>
              <Button title="Cancel" onPress={toggleTypeModal} />
            </View>
          </View>
        </Modal>

        {/* Bottom Button */}
        <View style={styles.bottomButtonsContainer}>
          <TouchableOpacity
            style={[styles.doneButton, { opacity: isFormValid ? 1 : 0.5 }]}
            onPress={() => {
              if (isFormValid) {
                Alert.alert(
                  "Property Added",
                  "Your property has been added successfully!",
                  [
                    {
                      text: "OK",
                      onPress: () => {
                        // Navigate to the home screen
                        navigation.navigate("TenantHome");
                      },
                    },
                  ]
                );
              } else {
                Alert.alert("Please fill in all required fields.");
              }
            }}
            disabled={!isFormValid} // Until all details are filled
          >
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>

        <BottomNavigation navigation={navigation} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
  },
  header: {
    height: 90,
    backgroundColor: "#6A8DB5",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "#E0E0E0",
    borderBottomWidth: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  formContainer: {
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderWidth: 1,
    borderColor: "#D3D3D3",
    borderRadius: 5,
    marginBottom: 20,
  },
  uploadButton: {
    padding: 10,
    backgroundColor: "#6A8DB5",
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  uploadText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  uploadedImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  consentContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  consentText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#555",
    flex: 1,
  },
  bottomButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#f5f5f5",
  },
  doneButton: {
    position: "absolute",
    bottom: 20,
    backgroundColor: "#6A8DB5",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: "40%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    width: 300,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalOption: {
    fontSize: 16,
    marginVertical: 10,
    color: "#007BFF",
  },
});
