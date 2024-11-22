import React, { useState } from "react";
import { View } from "react-native";
import ResultsScreen from "../Screen/SearchScreen/ResultsScreen"; // Adjust path as necessary
import SavedScreen from "../Screen/FavoriteScreen/FavoriteScreen"; // Adjust path as necessary

const ParentComponent = () => {
  const [savedSearches, setSavedSearches] = useState([]);

  const handleSaveSearch = (search) => {
    setSavedSearches((prevSearches) => {
      if (
        !prevSearches.some(
          (s) =>
            s.keyword === search.keyword &&
            s.selectedLocation === search.selectedLocation
        )
      ) {
        return [...prevSearches, search];
      }
      return prevSearches;
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <ResultsScreen onSaveSearch={handleSaveSearch} />
      <SavedScreen savedSearches={savedSearches} />
    </View>
  );
};

export default ParentComponent;
