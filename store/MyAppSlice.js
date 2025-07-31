import { createSlice } from "@reduxjs/toolkit";

const MyAppSlice = createSlice({
  name: "allPlaces",
  initialState: {
    allPlacesList: [],
    pickedLocation: {
      lat: "",
      long: "",
    },
  },
  reducers: {
    addFavoritePlace: (state, action) => {
      state.allPlacesList.push(action.payload);
    },

    removeFavoritePlace: (state, action) => {
      const placeIndex = state.allPlacesList.findIndex(
        (place) => place.id === action.payload.id
      );
      if (placeIndex !== -1) {
        state.allPlacesList.splice(placeIndex, 1);
      }
    },

    addPickedLocation: (state, action) => {
      state.pickedLocation = {
        ...action.payload,
      };
    },

    removePickedLocation: (state, action) => {
      state.pickedLocation = {
        lat: "",
        long: "",
      };
    },

    updateReduxDatabase: (state, action) => {
      state.allPlacesList = action.payload;
    },
    
  },
});

export const addFavoritePlace = MyAppSlice.actions.addFavoritePlace;
export const removeFavoritePlace = MyAppSlice.actions.removeFavoritePlace;
export const addPickedLocation = MyAppSlice.actions.addPickedLocation;
export const removePickedLocation = MyAppSlice.actions.removePickedLocation;
export const updateReduxDatabase = MyAppSlice.actions.updateReduxDatabase;

export default MyAppSlice.reducer;
