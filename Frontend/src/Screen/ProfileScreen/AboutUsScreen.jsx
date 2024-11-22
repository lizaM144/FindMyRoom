import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const AboutUsScreen = ({ navigation }) => {
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
        <Text style={styles.headerText}>About Us</Text>
      </View>

      {/* Content */}
      {/* <View style={styles.content}>
        <Image
          source={{
            uri: "https://nepalhomesearch.com/wp-content/uploads/2023/06/Baluwatar-apartments-382.jpg",
          }}
          style={styles.logo}
        /> */}
      <View style={styles.content}>
        <Image source={require("../../assets/logo.png")} style={styles.logo} />

        <Text style={styles.title}>Welcome to Find My Room App</Text>

        <View style={styles.infoBox}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.description}>
            Find My App is dedicated to helping users effortlessly find
            properties they need. We streamline the property search process with
            reliable and up-to-date information.
          </Text>

          <Text style={styles.sectionTitle}>Meet Our Team</Text>
          <Text style={styles.description}>
            Our team is made up of passionate individuals committed to
            simplifying property discovery, focusing on integrity, accuracy, and
            user experience.
          </Text>

          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.description}>
            Reach out with questions or feedback at:
          </Text>
          <Text style={styles.contactInfo}>Email: support@findmyapp.com</Text>
          <Text style={styles.contactInfo}>Phone: +977- 9768421869</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f7fb",
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
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 400,
    height: 150,
    borderRadius: 40,
    marginTop: 18,
    marginBottom: 38,
    backgroundColor: "#e1e8ee",
    borderWidth: 1,
    borderColor: "#d1d9e6",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#002D62",
    marginBottom: 38,
  },
  infoBox: {
    width: "100%",
    backgroundColor: "#E7EFFB",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#002D62",
    marginTop: 15,
    marginBottom: 5,
  },
  description: {
    fontSize: 15,
    color: "#7f8c8d",
    lineHeight: 22,
    marginBottom: 15,
  },
  contactInfo: {
    fontSize: 15,
    color: "#34495e",
    marginTop: 5,
  },
});

export default AboutUsScreen;
