import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const EditProfileScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSaveChanges = () => {
    if (!username.trim()) {
      Alert.alert("Error", "Please enter a valid username.");
      return;
    }

    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    if (!phone.trim() || !/^\d+$/.test(phone)) {
      Alert.alert("Error", "Please enter a valid phone number.");
      return;
    }

    setIsSubmitting(true);

    // Simulate an API call
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert("Success", "Your profile has been updated.");
      navigation.goBack();
    }, 1000);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Edit Profile</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter new username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter new email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter new phone number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <TouchableOpacity
          style={[styles.button, isSubmitting && styles.disabledButton]}
          onPress={handleSaveChanges}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dde5ef",
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
  content: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#6A8DB5",
    padding: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#B0C4DE",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default EditProfileScreen;
