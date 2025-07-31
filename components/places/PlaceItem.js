import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React from "react";

export default function PlaceItem({ place, onPress }) {
  const imageSource =
    typeof place.imageUri === "string"
      ? { uri: place.imageUri }
      : place.imageUri;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.buttonStyle,
        pressed ? styles.buttonOpacity : null,
      ]}
    >
      <View style={styles.rowContainer}>
        <Image source={imageSource} style={styles.imageStyle} />
        <View style={styles.boxContainer}>
          <Text style={styles.titleStyle}>{place.title}</Text>
          <Text
            style={styles.subTitleStyle}
            numberOfLines={4}
            ellipsizeMode="tail"
          >
            {place.location.address}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonStyle: { flex: 1 },
  buttonOpacity: { opacity: 0.7 },
  rowContainer: {
    flexDirection: "row",
    margin: 10,
    backgroundColor: "#b1b1",
    borderRadius: 10,
  },
  imageStyle: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    height: 100,
    width: 100,
  },
  boxContainer: {
    paddingStart: 10,
    paddingTop: 5,
    flex: 1,
  },
  titleStyle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  subTitleStyle: {
    fontSize: 13,
    color: "#666",
  },
});
