import { combineReducers } from "@reduxjs/toolkit";
import lists from "./list";
import items from "./item";
export default combineReducers({
  lists,
  items,
});
