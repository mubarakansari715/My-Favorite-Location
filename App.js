import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AllPlaces from "./screens/AllPlaces";
import AddPlaces from "./screens/AddPlaces";
import PlaceDetails from "./screens/PlaceDetails";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "./Constants/Colors";
import { Provider } from "react-redux";
import { AppStore } from "./store/AppStore";
import Map from "./screens/Map";
import { IconButton } from "react-native-paper";
import MapViewScreen from "./screens/MapView";
import AppLoading from "expo-app-loading";
import { useEffect, useState } from "react";
import { init } from "./utils/database";

const Stack = createNativeStackNavigator();
export default function App() {
  const [dbInitialize, setDbInitialize] = useState(false);
  useEffect(() => {
    init()
      .then(() => {
        setDbInitialize(true);
      })
      .catch(() => {
        console.log("database initialize faild");
        setDbInitialize(false);
      });
  }, [dbInitialize]);

  function NavigationLayout() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="allplaces"
          screenOptions={{
            animation: "slide_from_right", // This gives iOS-like push animation on both platforms
            headerStyle: { backgroundColor: Colors.primary500 },
            headerTintColor: Colors.gray700,
            contentStyle: { backgroundColor: "white" },
          }}
        >
          <Stack.Screen
            name="allplaces"
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "Your favorite places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  icon="plus-circle"
                  size={28}
                  iconColor={tintColor}
                  onPress={() => navigation.navigate("addplace")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="addplace"
            component={AddPlaces}
            options={{
              title: "Add New Place",
            }}
          />
          <Stack.Screen
            name="placedetails"
            component={PlaceDetails}
            options={{
              title: "Place Details",
            }}
          />
          <Stack.Screen
            name="mapScreen"
            component={Map}
            options={{ title: "Map" }}
          />

          <Stack.Screen
            name="mapView"
            component={MapViewScreen}
            options={{ title: "Map View" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      <Provider store={AppStore}>
        <NavigationLayout />
      </Provider>
    </>
  );
}
