import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import BASE_URL from "../apiConfig.js"; // Base API URL

const NewPassword = ({ navigation, route }) => {
  const { email, otp } = route.params; // Assuming you're passing the email and OTP from the OTPVerification screen
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validatePassword = () => {
    let newErrors = {};

    const passwordCriteria = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}/;
    if (!newPassword) {
      newErrors.newPassword = "Please enter a new password";
    } else if (!passwordCriteria.test(newPassword)) {
      newErrors.newPassword =
        "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, and one number";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleResetPassword = async () => {
    if (validatePassword()) {
      try {
        const response = await fetch(`${BASE_URL}/api/auth/reset-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, otp, newPassword }),
        });

        const data = await response.json();

        if (response.ok) {
          Alert.alert("Success", "Password has been changed successfully!", [
            { text: "OK", onPress: () => navigation.navigate("Login") },
          ]);
        } else {
          Alert.alert("Error", data.message || "Something went wrong");

          // setErrors({ newPassword: data.message || "Something went wrong" });
        }
      } catch (error) {
        console.error("Error resetting password:", error);
        Alert.alert("Error", "Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Create new password</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.inputBlock}>
          <Text style={styles.label}>Create new password</Text>
          <TextInput
            style={styles.input}
            placeholder="New password"
            value={newPassword}
            onChangeText={(text) => {
              setNewPassword(text);
              setErrors({ ...errors, newPassword: "" });
            }}
            secureTextEntry
          />
          {errors.newPassword && (
            <Text style={styles.errorText}>{errors.newPassword}</Text>
          )}
        </View>

        <View style={styles.inputBlock}>
          <Text style={styles.label}>Confirm new password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm password"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setErrors({ ...errors, confirmPassword: "" });
            }}
            secureTextEntry
          />
          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleResetPassword}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
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
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: "center",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 100,
    backgroundColor: "#b7c8f4",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 18,
    width: "100%",
  },
  backButton: {
    position: "absolute",
    left: 16,
  },
  backButtonText: {
    fontSize: 24,
    color: "#2c2c2c",
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    color: "#2c2c2c",
    textAlign: "center",
    flex: 1,
    marginTop: 25,
  },
  inputBlock: {
    width: "90%",
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c2c2c",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f6f6f6",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#737a80",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
  continueButton: {
    backgroundColor: "#6786ab",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    width: "80%",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default NewPassword;
