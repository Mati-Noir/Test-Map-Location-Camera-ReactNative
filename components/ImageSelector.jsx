import * as ImagePicker from "expo-image-picker";
import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../constants";

const ImageSelector = props => {
  const [pickedUri, setPickedUri] = useState();

  const verifyPermissons = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permisos son insuficientes",
        "Necesitamos que habilite la camara para usar la aplicacion",
        [{ text: "Ok" }]
      );
      return false;
    }
    return true;
  };

  const handlerTakeImage = async () => {
    const hasPermission = await verifyPermissons();
    if (!hasPermission) return;

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });
    setPickedUri(image.assets[0].uri);
    props.onImage(image.assets[0].uri);
  };

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {!pickedUri ? (
          <Text>No hay ninguna foto de momento...</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedUri }} />
        )}
      </View>
      <Button
        title="Tomar Foto"
        color={COLORS.Orange}
        onPress={handlerTakeImage}
      />
    </View>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  preview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.Golden,
    borderWidth: 6,
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: " 100%",
    borderRadius: 4,
  },
});
