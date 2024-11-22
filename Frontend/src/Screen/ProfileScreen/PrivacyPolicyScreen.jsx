import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const PrivacyPolicyScreen = ({ navigation }) => {
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
        <Text style={styles.headerText}>Privacy Policy</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>
            1. Information Collection and Use
          </Text>
          <Text style={styles.content}>
            We collect data to provide better services to our users. The
            information we collect helps improve the functionality and
            experience of our application.
          </Text>

          <Text style={styles.sectionTitle}>2. Data Security</Text>
          <Text style={styles.content}>
            We take appropriate measures to safeguard your data. Your privacy is
            our priority, and we ensure your personal information is protected
            from unauthorized access.
          </Text>

          <Text style={styles.sectionTitle}>3. Your Rights</Text>
          <Text style={styles.content}>
            You have the right to access, modify, or delete your personal
            information. You can contact us to exercise your rights and for any
            inquiries regarding your data.
          </Text>
        </View>
      </ScrollView>
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
  scrollContainer: {
    paddingHorizontal: 10,
  },
  contentContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6495ED",
    marginTop: 15,
    marginBottom: 5,
  },
  content: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
    marginBottom: 15,
    textAlign: "justify",
  },
});

export default PrivacyPolicyScreen;
