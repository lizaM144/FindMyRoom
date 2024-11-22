import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import BASE_URL from "../apiConfig.js"; // Base API URL

const ResetPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleContinue = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+$/;

    if (!email) {
      setError("Please enter your email address");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/auth/request-otp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "OTP sent to your email.");
        navigation.navigate("OTPVerification", { email });
      } else {
        setError(data.message || "Unable to process your request.");
      }
    } catch (error) {
      console.error("Error sending reset password request:", error);
      Alert.alert("Error", "Something went wrong. Please try again later.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.navigate("OTPVerification")}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Reset your password</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.description}>
          Please enter your email address and we will send an OTP code in the
          next step to reset your password.
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="xyz@gmail.com"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError("");
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
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
  description: {
    fontSize: 16,
    color: "#2c2c2c",
    textAlign: "center",
    marginVertical: 30,
    lineHeight: 24,
  },
  inputContainer: {
    width: "90%",
    marginVertical: 10,
  },
  label: {
    fontSize: 12,
    color: "#9c9494",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginTop: 5,
    fontSize: 14,
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

export default ResetPassword;
