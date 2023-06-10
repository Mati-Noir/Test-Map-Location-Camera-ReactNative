// navigation
import MainNavigator from "./navigation";
import { Provider } from "react-redux";
import React from "react";
import store from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
