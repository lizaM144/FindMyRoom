import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";

const BottomNavigation = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const getIconColor = (routeName) => {
    if (routeName === "Search") {
      return route.name === "Search" || route.name === "Result"
        ? "green"
        : "#000";
    }
    return route.name === routeName ? "green" : "#000";
  };

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("TenantHome")}
      >
        <Icon
          name="home-outline"
          size={24}
          style={{ color: getIconColor("TenantHome") }}
        />
        <Text style={[styles.navLabel, { color: getIconColor("TenantHome") }]}>
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Search")}
      >
        <Icon
          name="search-outline"
          size={24}
          style={{ color: getIconColor("Search") }}
        />
        <Text style={[styles.navLabel, { color: getIconColor("Search") }]}>
          Search
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("AddProperty")}
      >
        <Icon
          name="add-circle-outline"
          size={24}
          style={{ color: getIconColor("AddProperty") }}
        />
        <Text style={[styles.navLabel, { color: getIconColor("AddProperty") }]}>
          Add Property
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate("Profile")}
      >
        <Icon
          name="person-outline"
          size={24}
          style={{ color: getIconColor("Profile") }}
        />
        <Text style={[styles.navLabel, { color: getIconColor("Profile") }]}>
          Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 61,
    paddingBottom: 10,
  },
  navButton: {
    alignItems: "center",
  },
  navLabel: {
    fontSize: 14,
    color: "#5f5d5d",
  },
});

export default BottomNavigation;

// import React from "react";
// import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
// import Icon from "react-native-vector-icons/Ionicons";
// import { useNavigation, useRoute } from "@react-navigation/native";

// const BottomNavigation = () => {
//   const navigation = useNavigation();
//   const route = useRoute();

//   const getIconColor = (routeName) => {
//     if (routeName === "Search") {
//       return route.name === "Search" || route.name === "Result" ? "green" : "#000";
//     }
//     return route.name === routeName ? "green" : "#000";
//   };

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <View style={styles.bottomNav}>
//         <TouchableOpacity
//           style={styles.navButton}
//           onPress={() => navigation.navigate("TenantHome")}
//         >
//           <Icon
//             name="home-outline"
//             size={24}
//             style={{ color: getIconColor("TenantHome") }}
//           />
//           <Text style={[styles.navLabel, { color: getIconColor("TenantHome") }]}>
//             Home
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.navButton}
//           onPress={() => navigation.navigate("Search")}
//         >
//           <Icon
//             name="search-outline"
//             size={24}
//             style={{ color: getIconColor("Search") }}
//           />
//           <Text style={[styles.navLabel, { color: getIconColor("Search") }]}>
//             Search
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.navButton}
//           onPress={() => navigation.navigate("Favorites")}
//         >
//           <Icon
//             name="heart-outline"
//             size={24}
//             style={{ color: getIconColor("Favorites") }}
//           />
//           <Text style={[styles.navLabel, { color: getIconColor("Favorites") }]}>
//             Favorites
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.navButton}
//           onPress={() => navigation.navigate("Profile")}
//         >
//           <Icon
//             name="person-outline"
//             size={24}
//             style={{ color: getIconColor("Profile") }}
//           />
//           <Text style={[styles.navLabel, { color: getIconColor("Profile") }]}>
//             Profile
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     backgroundColor: "#fff", // Background color of the SafeAreaView
//   },
//   bottomNav: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     alignItems: "center",
//     height: 61,
//     paddingBottom: 10,
//     backgroundColor: "#fff",
//   },
//   navButton: {
//     alignItems: "center",
//   },
//   navLabel: {
//     fontSize: 14,
//     color: "#5f5d5d",
//   },
// });

// export default BottomNavigation;
