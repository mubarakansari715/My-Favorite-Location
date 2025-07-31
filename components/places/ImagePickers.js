import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
} from "expo-image-picker";
import { Colors } from "../../Constants/Colors";
import OutlinedButton from "../UI/OutlinedButton";
import * as ImagePicker from "expo-image-picker";

export default function ImagePickers({ onImageTaken }) {
  const [imageUri, setImageUri] = useState("");
  const [cameraPermissionStatus, requestCameraPermission] =
    useCameraPermissions();

  async function verifyPermission() {
    if (cameraPermissionStatus.status === PermissionStatus.UNDETERMINED) {
      const permission = await requestCameraPermission();
      return permission.granted;
    }
    if (cameraPermissionStatus.status === PermissionStatus.DENIED) {
      const permission = await requestCameraPermission();
      return permission.granted;
    }

    return true;
  }

  async function takePhotoFormCamera() {
    const hasPermisisonGranted = await verifyPermission();
    if (!hasPermisisonGranted) {
      return;
    }
    try {
      const result = await launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 1,
      });
      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setImageUri(uri);
        onImageTaken(uri);
      }
    } catch (error) {
      console.error("Error launching camera:", error);
    }
  }

  async function takePhotoFormGallary() {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      onImageTaken(uri);
    }
  }

  return (
    <View>
      <View>
        {imageUri && imageUri !== "" ? (
          <Image source={{ uri: imageUri }} style={styles.imageStyle} />
        ) : (
          <View style={styles.imageTextContainer}>
            <Text style={styles.imageTextStyle}>
              Not Image yet. Please select the image!
            </Text>
          </View>
        )}
      </View>
      {/* <Button title="Take a Photo" onPress={takePhotoFormGallary} /> */}
      <View style={styles.buttonContainer}>
        <OutlinedButton icon={"camera"} onPress={takePhotoFormCamera}>
          Take photo
        </OutlinedButton>
        <OutlinedButton
          icon={"folder-multiple-image"}
          onPress={takePhotoFormGallary}
        >
          Take photo
        </OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageStyle: {
    height: 200,
    width: "100%",
    marginBottom: 10,
    borderRadius: 4,
  },
  imageTextContainer: {
    height: 200,
    width: "100%",
    backgroundColor: Colors.primary100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    marginBottom: 10,
  },
  imageTextStyle: {
    color: Colors.primary800,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
