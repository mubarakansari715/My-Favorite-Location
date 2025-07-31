import { StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";

export default function MapViewScreen({ route }) {
  // Add error handling for route params
  if (!route || !route.params) {
    return (
      <View style={styles.container}>
        <Text>No location data available</Text>
      </View>
    );
  }

  const item = route.params?.item;

  // Add error handling for item
  if (!item || !item.location) {
    return (
      <View style={styles.container}>
        <Text>Invalid location data</Text>
      </View>
    );
  }

  const region = {
    latitude: item.location.lat,
    longitude: item.location.long,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const currentCoordinate = {
    latitude: item.location.lat,
    longitude: item.location.long,
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} initialRegion={region}>
        {currentCoordinate && (
          <Marker title={item.title} coordinate={currentCoordinate} />
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
