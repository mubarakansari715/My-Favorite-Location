import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import PlacesList from "../components/places/PlacesList";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlcaesFromDb } from "../utils/database";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { updateReduxDatabase } from "../store/MyAppSlice";

export default function AllPlaces() {
  const [getAllDataFromDb, setAllDataFromDb] = useState([]);
  const getPlaceListFromRedux = useSelector((state) => state.allPlaces.allPlacesList);
  const dispatch = useDispatch()
  const isFoucus = useIsFocused();

  useEffect(() => {
    async function fetchAllPlacesFromLocalDb() {
      const response = await getAllPlcaesFromDb();
      if (isFoucus) {
        setAllDataFromDb(response);
        dispatch(updateReduxDatabase(response))
      }
    }

    fetchAllPlacesFromLocalDb();
  }, [isFoucus]);

  const allDataCheck = getPlaceListFromRedux.length <= 0 ? getAllDataFromDb : getPlaceListFromRedux 
 
  return (
    <View style={styles.container}>
      <PlacesList places={allDataCheck} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
