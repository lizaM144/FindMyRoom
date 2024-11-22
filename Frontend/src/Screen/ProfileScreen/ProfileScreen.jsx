import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Icon from "react-native-vector-icons/Ionicons";
import BottomNavigation from "../../Components/BottomNavigation";

const ProfileScreen = ({ navigation }) => {
  const [profileData, setProfileData] = useState({
    name: "Abcdef",
    profilePicture:
      "https://i.pinimg.com/736x/2a/7d/4c/2a7d4c4bc1381a476b8b8a85885ac392.jpg",
  });

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission is required to access the media library.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfileData((prevData) => ({
        ...prevData,
        profilePicture: result.uri,
      }));
    }
  };

  const handleSettings = () => {
    navigation.navigate("Settings");
  };

  const handleAboutUs = () => {
    navigation.navigate("AboutUs");
  };

  const handleLogout = () => {
    Alert.alert("Log Out", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Log Out",
        onPress: () => {
          navigation.navigate("Login");
        },
      },
    ]);
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
        <Text style={styles.headerText}>Profile</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.profileSection}>
          <Image
            source={{ uri: profileData.profilePicture }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
            <Text style={styles.uploadText}>Edit Picture</Text>
          </TouchableOpacity>
          <Text style={styles.username}>{profileData.name}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ACCOUNT</Text>
          <TouchableOpacity style={styles.option} onPress={handleSettings}>
            <View style={styles.optionContent}>
              <Icon
                name="settings-outline"
                size={20}
                color="#333"
                style={styles.icon}
              />
              <Text style={styles.optionText}>Settings</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.option, { borderBottomWidth: 0 }]}
            onPress={handleAboutUs}
          >
            <View style={styles.optionContent}>
              <Icon
                name="information-circle-outline"
                size={20}
                color="#333"
                style={styles.icon}
              />
              <Text style={styles.optionText}>About Us</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <BottomNavigation navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dde5efss",
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
  profileSection: {
    alignItems: "center",
    marginTop: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#E0E0E0",
  },
  uploadButton: {
    marginTop: 10,
    backgroundColor: "#6A8DB5",
    padding: 6,
    borderRadius: 8,
  },
  uploadText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  username: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "bold",
  },
  section: {
    marginTop: 20,
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#666666",
    marginBottom: 10,
    marginLeft: 10,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomColor: "#D1D1D1",
    borderBottomWidth: 1,
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
  logoutButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderColor: "#007AFF",
    borderWidth: 1,
    alignItems: "center",
  },
  logoutText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfileScreen;
