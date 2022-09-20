import { combineReducers } from "redux";
import authenticationReducer from "./authenticationReducer";
import environmentReducer from "./environmentReducer";
import loaderReducer from "./loaderReducer";
import notificationReducer from "./notificationReducer";
import carFiltersSlice from './carFiltersSlice'
import shortlistCarsSlice from "./shortlistCarsSlice";


const rootReducer = combineReducers({
  api: environmentReducer,
  loader: loaderReducer,
  notification: notificationReducer,
  auth: authenticationReducer,
  carFilters: carFiltersSlice,
  shortlistCars: shortlistCarsSlice


});

export default rootReducer;
