import { combineReducers } from "@reduxjs/toolkit";
import lists from "./list";
import items from "./item";
import itemsLists from "./itemList";
import categories from "./categories";
export default combineReducers({
  lists,
  items,
  itemsLists,
  categories,
});
