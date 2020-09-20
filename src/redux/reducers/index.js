import { combineReducers } from "redux";
import authReducer from "./auth";
import stickingsReducer from "./stickings";

const rootReducer = combineReducers({
  auth: authReducer,
  stickings: stickingsReducer,
});

export default rootReducer;
