import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import user from "./user";
import _class from "./class";

export default combineReducers({
  auth,
  user,
  _class,
});
