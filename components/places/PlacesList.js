import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../Constants/Colors";
import { useNavigation } from "@react-navigation/native";

export default function PlacesList({ places }) {
  const navigation = useNavigation();
  if (!Array.isArray(places) || places.length === 0) {
    return (
      <View style={styles.emptyViewStyle}>
        <Text style={styles.emptyTextStyle}>
          No places added yet. Please start adding places!
        </Text>
      </View>
    );
  }

  const onItemClickHandler = (item) => {
    navigation.navigate("mapView", {
      item,
    });
  };
  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={places}
      renderItem={({ item }) => (
        <PlaceItem place={item} onPress={() => onItemClickHandler(item)} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  emptyViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyTextStyle: {
    fontSize: 14,
    color: Colors.primary200,
    fontStyle: "italic",
  },
});
