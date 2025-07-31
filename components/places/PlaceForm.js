import {
  Alert,
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { TextInput } from "react-native-paper";
import { Colors } from "../../Constants/Colors";
import ImagePickers from "./ImagePickers.js";
import LocationPicker from "./LocationPicker";
import { useDispatch } from "react-redux";
import {
  addFavoritePlace,
  addPickedLocation,
  removePickedLocation,
} from "../../store/MyAppSlice";
import { useNavigation } from "@react-navigation/native";
import FilledButton from "../UI/FilledButton.js";
import { insearPlacedb } from "../../utils/database.js";

export default function PlaceForm() {
  const navigation = useNavigation();
  const [selectedImageUri, setSelectedImageUri] = useState("");
  const [inputTitle, setInputTitle] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(null);
  const dispatch = useDispatch();

  const onSaveDataClick = async () => {
    // Check if selectedLocation is null before accessing its properties
    if (!selectedLocation || inputTitle === "" || selectedImageUri === "") {
      Alert.alert("Error", "Please fill all data first");
      return;
    }

    try {
      const placeData = {
        // id: new Date().toString() + Math.random().toString(),
        title: inputTitle,
        imageUri: selectedImageUri,
        location: {
          lat: selectedLocation.lat,
          long: selectedLocation.long,
          address: selectedLocation.address,
        },
      };

      console.log("first init ", placeData);

      const insertResult = await insearPlacedb(placeData);

      const placeDataWithId = {
        ...placeData,
        id: insertResult.lastInsertRowId,
      };

      dispatch(addFavoritePlace(placeDataWithId));
      navigation.pop();
    } catch (error) {
      console.error("Error saving place:", error);
      Alert.alert("Error", "Failed to save place. Please try again.");
    }
  };

  const onInputChangeTextHandler = (inputType, inputValue) => {
    switch (inputType) {
      case "title":
        setInputTitle(inputValue);

        break;
      default:
        console.log("Unknown input type:", inputType);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.viewContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="Enter title"
          mode="outlined"
          value={inputTitle}
          onChangeText={(text) => onInputChangeTextHandler("title", text)}
        />

        <ImagePickers
          onImageTaken={(imageUri) => {
            setSelectedImageUri(imageUri);
          }}
        />
        <LocationPicker
          currentLocation={(location) => {
            setSelectedLocation(location);
          }}
        />

        {selectedLocation && selectedLocation.lat !== undefined && (
          <View style={styles.locationInfo}>
            <Text style={styles.locationText}>
              Selected Location: {selectedLocation.address}
            </Text>
          </View>
        )}

        <FilledButton onPress={onSaveDataClick}>Save</FilledButton>
        <View style={{ height: 80 }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  viewContainer: {
    gap: 10,
  },
  titleTextStyle: {
    color: Colors.primary500,
    paddingStart: 5,
    fontSize: 16,
    marginBottom: 4,
  },
  inputText: {
    backgroundColor: Colors.primary100,
  },
  locationInfo: {
    backgroundColor: Colors.primary200,
    padding: 10,
    borderRadius: 8,
    marginVertical: 5,
  },
  locationText: {
    fontSize: 14,
    color: Colors.primary700,
    textAlign: "center",
  },
});
