import { applyMiddleware, combineReducers, createStore } from "redux";
import PlacesReducer from "./places.reducer";
import thunk from "redux-thunk";

// reducers

const RootReducer = combineReducers({
  places: PlacesReducer,
});

export default createStore(RootReducer, applyMiddleware(thunk));
