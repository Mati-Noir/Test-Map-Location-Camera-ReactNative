import { Button, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../constants";
import ImageSelector from "../components/ImageSelector";
import LocationSelector from "../components/LocationSelector";
import { addPlace } from "../store/places.actions";
import { useDispatch } from "react-redux";

const NewPlaceScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();

  const handleTitleChange = text => setTitle(text);

  const handleSave = () => {
    dispatch(addPlace(title, image));
    navigation.navigate("Direcciones");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.label}>Nombre del lugar:</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={handleTitleChange}
        />
        <ImageSelector onImage={setImage} />
        <LocationSelector />
        <Button
          title="Guardar dirección"
          color={COLORS.MAROON}
          onPress={handleSave}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 16,
  },
  input: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 2,
    paddingVertical: 4,
  },
});

export default NewPlaceScreen;
