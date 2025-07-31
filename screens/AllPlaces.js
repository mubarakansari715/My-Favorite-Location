import { StyleSheet, Text, View } from "react-native";
import React from "react";
import PlacesList from "../components/places/PlacesList";
import { useSelector } from "react-redux";

export default function AllPlaces() {
  const getPlaceList = useSelector((state) => state.allPlaces.allPlacesList);
  console.log("MainList:: ", getPlaceList)
  return (
    <View style={styles.container}>
      <PlacesList places={getPlaceList} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
