import { combineReducers } from "@reduxjs/toolkit";
import lists from "./list";
import items from "./item";
import itemsLists from "./itemList";
export default combineReducers({
  lists,
  items,
  itemsLists,
});
