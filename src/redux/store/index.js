import { createStore, combineReducers } from "redux";

import authReducer from "../reducers/AuthReducer";

const store = createStore(
  combineReducers({
    auth: authReducer,
  })
);

export default store;
