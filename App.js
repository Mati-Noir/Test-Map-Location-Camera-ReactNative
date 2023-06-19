import MainNavigator from "./navigation";
import { Provider } from "react-redux";
import React from "react";
import store from "./store";
import { init } from "./db";

init()
  .then(() => console.log("Base de datos iniciada"))
  .catch(err => {
    console.log("Base de datos no creada")
    console.log(err.message);
  });

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
