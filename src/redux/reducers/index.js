import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth";
import user from "./user";
import student from "./student";
import counseling from "./counseling";
import log from "./log";
import _class from "./class";

export default combineReducers({
  auth,
  user,
  student,
  counseling,
  log,
  _class,
});
