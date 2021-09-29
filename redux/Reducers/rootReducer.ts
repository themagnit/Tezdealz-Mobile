import { combineReducers } from "redux";
import authenticationReducer from "./authenticationReducer";
import environmentReducer from "./environmentReducer";
import loaderReducer from "./loaderReducer";
import notificationReducer from "./notificationReducer";

const rootReducer = combineReducers({
  api: environmentReducer,
  loader: loaderReducer,
  notification: notificationReducer,
  auth: authenticationReducer,
});

export default rootReducer;
