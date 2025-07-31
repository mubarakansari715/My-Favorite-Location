import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Colors } from "../Constants/Colors";
import { IconButton, MD3Colors } from "react-native-paper";
import { useDispatch } from "react-redux";
import { addPickedLocation } from "../store/MyAppSlice";

export default function Map({ navigation }) {
  const dispatch = useDispatch();
  const [selectedLocation, setSelectedLocation] = useState();
  const region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const onSelectedLocatonHandler = (event) => {
    const latitude = event.nativeEvent.coordinate.latitude;
    const longitude = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({
      latitude: latitude,
      longitude: longitude,
    });
  };

  const savePickupLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked!",
        "Please pickup the location on Map first."
      );
      return;
    }

    // Pass data back to previous screen before going back

    dispatch(addPickedLocation(selectedLocation));
    navigation.pop();
  }, [selectedLocation, navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="content-save-all"
          iconColor={tintColor}
          size={20}
          onPress={savePickupLocationHandler}
        />
      ),
    });
  }, [navigation, savePickupLocationHandler, selectedLocation]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        onPress={onSelectedLocatonHandler}
      >
        {selectedLocation && (
          <Marker title="My current Location" coordinate={selectedLocation} />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
