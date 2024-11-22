import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/Screen/LoginScreen";
import SignUpScreen from "./src/Screen/SignUpScreen";
import ResetPassword from "./src/Screen/ResetPassword";
import OTPVerification from "./src/Screen/OTPVerification";
import NewPassword from "./src/Screen/NewPassword";
import HomeScreen from "./src/Screen/TenantHomeScreen/HomeScreen";
import PropertyDetailScreen from "./src/Screen/PropertyScreen/PropertyDetailScreen";
import SearchScreen from "./src/Screen/SearchScreen/SearchScreen";
import ResultsScreen from "./src/Screen/SearchScreen/ResultsScreen";
import ProfileScreen from "./src/Screen/ProfileScreen/ProfileScreen";
import AboutUsScreen from "./src/Screen/ProfileScreen/AboutUsScreen";
import PrivacyPolicyScreen from "./src/Screen/ProfileScreen/PrivacyPolicyScreen";
import SettingsScreen from "./src/Screen/ProfileScreen/SettingsScreen";
import AddPropertyScreen from "./src/AddPropertyScreen/AddPropertyScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OTPVerification"
          component={OTPVerification}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewPassword"
          component={NewPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TenantHome"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PropertyDetail"
          component={PropertyDetailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Results"
          component={ResultsScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AboutUs"
          component={AboutUsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          component={PrivacyPolicyScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddProperty"
          component={AddPropertyScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
