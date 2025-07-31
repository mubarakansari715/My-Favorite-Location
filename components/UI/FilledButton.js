import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "../../Constants/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

export default function FilledButton({ icon, onPress, children }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed ? styles.buttonOpacity : null,
      ]}
      onPress={onPress}
    >
      <MaterialCommunityIcons
        style={styles.imageIcon}
        name={icon}
        size={24}
        color={Colors.primary500}
      />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderColor: Colors.primary500,
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: Colors.primary500,
  },
  buttonOpacity: {
    opacity: 0.7,
  },
  imageIcon: {
    marginRight: 6,
  },
  text: {
    color: Colors.white,
    fontWeight: "bold",
    fontSize: 17,
  },
});
