import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [isNotificationsEnabled, setNotificationsEnabled] = useState(false);

  const handlePrivacyPolicy = () => {
    navigation.navigate("PrivacyPolicy");
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
        <Text style={styles.headerText}>Settings</Text>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={handlePrivacyPolicy}
        >
          <View style={styles.optionContent}>
            <Icon
              name="information-circle-outline"
              size={20}
              color="#333"
              style={styles.icon}
            />
            <Text style={styles.optionText}>Privacy Policy</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
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
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomColor: "#D1D1D1",
    borderBottomWidth: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    marginBottom: 10,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 8,
  },
  optionText: {
    fontSize: 16,
    color: "#333333",
  },
  arrow: {
    fontSize: 22,
    color: "#666666",
  },
});

export default SettingsScreen;
