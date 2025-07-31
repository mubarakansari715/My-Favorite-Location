import { Alert, Image, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { Colors } from "../../Constants/Colors";
import OutlinedButton from "../UI/OutlinedButton";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import {
  getMapPreview,
  getUserAddress,
  testGoogleMapsAPI,
} from "../../utils/Location";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { removePickedLocation } from "../../store/MyAppSlice";

export default function LocationPicker({ currentLocation }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const pickedLocationData = useSelector(
    (state) => state.allPlaces.pickedLocation
  );
  const [getCurrentLocation, setCurrentLocation] = useState(null);
  const [locationPermissionStatus, requestLocationPermission] =
    useForegroundPermissions();

  // Common function to fetch address and call currentLocation
  const fetchAddressAndUpdateLocation = async (latitude, longitude) => {
    try {
      const address = await getUserAddress(latitude, longitude);
      currentLocation({
        lat: latitude,
        long: longitude,
        address: address,
      });
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  // Update current location when data is received from Map screen
  useEffect(() => {
    if (pickedLocationData.lat !== "" && pickedLocationData.long !== "") {
      setCurrentLocation({
        lat: pickedLocationData.latitude,
        long: pickedLocationData.longitude,
      });

      // Use common function to fetch address and update location
      fetchAddressAndUpdateLocation(
        pickedLocationData.latitude,
        pickedLocationData.longitude
      );
    }
  }, [pickedLocationData]);

  // Cleanup pickedLocationData when component unmounts
  useEffect(() => {
    return () => {
      dispatch(removePickedLocation());
    };
  }, [dispatch]);

  async function verifyPermission() {
    if (locationPermissionStatus.status === PermissionStatus.UNDETERMINED) {
      const permission = await requestLocationPermission();
      return permission.granted;
    }
    if (locationPermissionStatus.status === PermissionStatus.DENIED) {
      const permission = await requestLocationPermission();
      return permission.granted;
    }

    return true;
  }

  async function LocateUserHandler() {
    const isGranted = await verifyPermission();
    if (isGranted) {
      try {
        const location = await getCurrentPositionAsync();

        setCurrentLocation({
          lat: location.coords.latitude,
          long: location.coords.longitude,
        });

        // Use common function to fetch address and update location
        await fetchAddressAndUpdateLocation(
          location.coords.latitude,
          location.coords.longitude
        );
      } catch (error) {
        console.error("Error getting location:", error);
        Alert.alert("Error", "Failed to get your current location");
      }
    } else {
      console.error("location not granted");
    }
  }

  async function PickupMapHandler() {
    navigation.navigate("mapScreen");
  }

  const mapPreviewUrl =
    getCurrentLocation && getCurrentLocation.lat !== undefined
      ? getMapPreview(getCurrentLocation.lat, getCurrentLocation.long)
      : null;

  return (
    <View>
      <View style={styles.mapPreview}>
        {getCurrentLocation !== null &&
        getCurrentLocation.lat !== undefined &&
        mapPreviewUrl ? (
          <Image
            source={{ uri: mapPreviewUrl }}
            style={styles.imageMapPreview}
            onError={() => {
              console.error("Failed to load map image");
            }}
          />
        ) : (
          <Text>No location map</Text>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <OutlinedButton icon={"map-legend"} onPress={LocateUserHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon={"map-marker"} onPress={PickupMapHandler}>
          Pick up Map
        </OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    height: 200,
    width: "100%",
    backgroundColor: Colors.primary100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginBottom: 10,
  },
  errorContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
    marginBottom: 5,
  },
  errorSubtext: {
    fontSize: 12,
    color: "gray",
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 10,
  },
  imageMapPreview: {
    height: 200,
    width: "100%",
    borderRadius: 10,
  },
});
