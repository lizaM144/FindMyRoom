import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import BASE_URL from "../apiConfig.js"; // Base API URL

const SignUpScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // Initialize loading state

  // const roles = [
  //   { label: "Landlord", value: "landlord" },
  //   { label: "Tenant", value: "tenant" },
  // ];

  const handleSignUp = async () => {
    let newErrors = {};

    if (!fullName) newErrors.fullName = "Please fill out this form";
    if (!phone) newErrors.phone = "Please fill out this form";
    if (!email) newErrors.email = "Please fill out this form";
    if (!password) newErrors.password = "Please fill out this form";
    if (!confirmPassword)
      newErrors.confirmPassword = "Please fill out this form";
    // if (!role) newErrors.role = "Please fill out this form";

    setErrors(newErrors);

    // if (Object.keys(newErrors).length === 0) {
    //   console.log("Signed up successfully!");
    //   navigation.navigate("Login");
    // }
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName,
            phone,
            email,
            password,
            // role,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Signed up successfully!", data);
          navigation.navigate("Login");
        } else {
          console.error("Sign-up failed:", data.message);
          setErrors({ api: data.message || "An error occurred." });
        }
      } catch (error) {
        console.error("Error signing up:", error);
        setErrors({ api: "Unable to connect to the server." });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      {errors.fullName && <Text style={styles.error}>{errors.fullName}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phone}
        onChangeText={setPhone}
      />
      {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      {errors.email && <Text style={styles.error}>{errors.email}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      {errors.password && <Text style={styles.error}>{errors.password}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {errors.confirmPassword && (
        <Text style={styles.error}>{errors.confirmPassword}</Text>
      )}

      {/* <View style={styles.pickerWrapper}>
        <RNPickerSelect
          onValueChange={(value) => setRole(value)}
          items={roles}
          placeholder={{
            label: "Select your Role",
            value: null,
            color: "#9EA0A4",
          }}
          style={pickerSelectStyles}
          useNativeAndroidPickerStyle={false}
          Icon={() => (
            <View
              style={{
                backgroundColor: "transparent",
                borderTopWidth: 5,
                borderTopColor: "#2D5DA7",
                borderRightWidth: 5,
                borderRightColor: "transparent",
                borderLeftWidth: 5,
                borderLeftColor: "transparent",
                width: 0,
                height: 0,
                marginTop: Platform.OS === "android" ? 5 : 20,
              }}
            />
          )}
        />
      </View>
      {errors.role && <Text style={styles.error}>{errors.role}</Text>} */}

      <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={styles.loginRedirect}
      >
        <Text>
          Already have an account?{" "}
          <Text style={[styles.link, { textDecorationLine: "underline" }]}>
            LOGIN
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#E0E8FC",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#2D5DA7",
  },
  input: {
    width: "100%",
    padding: 10,
    borderColor: "#2D5DA7",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  pickerWrapper: {
    width: "100%",
    borderColor: "#2D5DA7",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: "#fff",
    zIndex: 10, // Set a higher zIndex
  },
  signupButton: {
    width: "60%",
    backgroundColor: "#2D5DA7",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  signupButtonText: {
    color: "white",
    fontSize: 18,
  },
  loginRedirect: {
    marginTop: 10,
  },
  link: {
    color: "#2D5DA7",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    alignSelf: "flex-start",
    marginBottom: 15,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: "#2D5DA7",
    paddingRight: 30, // To ensure the text is not behind the icon
  },
  inputIOS: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 12,
    color: "#2D5DA7",
    paddingRight: 30, // To ensure the text is not behind the icon
  },
  iconContainer: {
    top: Platform.OS === "android" ? 10 : 15,
    right: 10,
  },
});

export default SignUpScreen;
