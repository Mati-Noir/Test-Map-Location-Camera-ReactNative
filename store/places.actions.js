import * as FileSystem from "expo-file-system";
import { Map } from "../constants/Map";
import { insertAddress, fetchAddress } from "../db";
export const ADD_PLACE = "ADD_PLACE";
export const LOAD_PLACES = "LOAD_PLACES";

export const addPlace = (title, image, location) => {
  return async dispatch => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=AIzaSyBvzO6kP9XrT7lhqUK4GaYziXfjtuEqHg4`);

    if(!response.ok) {
      throw new Error("No se ha podido comunicar con Google Maps");
    }

    const resData = await response.json();

    if(!resData.results) {
      throw new Error("No se han encontrado los datos para las coordenadas seleccionadas")
    }

    console.log(resData);

    const address = resData.results[0].formatted_address;

    const fileName = image.split("/").pop();
    const Path = FileSystem.documentDirectory + fileName;
    try {
      FileSystem.moveAsync({
        from: image,
        to: Path,
      });
      const result = await insertAddress(
        title,
        image,
        address,
        location.lat,
        location.lng,
      );
      console.log(result);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
    dispatch({ 
      type: ADD_PLACE,
      payload: {
        title,
        image: Path,
        address,
        lat: location.lat,
        lng: location.lng,
      }});
  };
};

export const loadAddress = () => {
  return async dispatch => {
    try {
      const result = await fetchAddress();
      console.log(result);
      dispatch({ type: LOAD_PLACES, places: result.rows._array});
    } catch (error) {
      throw error;
    }
  };
};
