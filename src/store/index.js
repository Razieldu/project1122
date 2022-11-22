import { createStore } from "redux";
import { countReducer } from "../reducers/reducers";

const store = createStore(
  countReducer,
);

export default store;
