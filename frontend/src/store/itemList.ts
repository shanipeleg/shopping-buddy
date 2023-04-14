import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../models/Item";
import { apiCallBegan } from "./api";
import { RootState } from "./configureStore";

interface ItemListsState {
  dataById: { [key: number]: Item };
  loadingAddingToList: boolean;
  errorAddingToList: null | string;
}

const initialState: ItemListsState = {
  dataById: {},
  loadingAddingToList: false,
  errorAddingToList: null,
};

const slice = createSlice({
  name: "items",
  initialState,
  reducers: {
    itemAddToListRequested: (state: ItemListsState) => {
      state.loadingAddingToList = true;
    },
    itemAddToListFailed: (state: ItemListsState) => {
      state.loadingAddingToList = false;
    },
    itemAddedToList: (state: ItemListsState, action: PayloadAction<Item>) => {
      state.loadingAddingToList = false;
    },
  },
});

export default slice.reducer;
const { itemAddToListRequested, itemAddToListFailed, itemAddedToList } =
  slice.actions;

//Selectors
export function getItems(state: RootState) {
  return state.items.data;
}

const url = "items/list";

//Actions
export const addItemToList = (itemTitle: string, listId: number) =>
  apiCallBegan({
    url: `${url}/${listId}`,
    data: { title: itemTitle, description: "" }, //TODO deal with description
    method: "post",
    onSuccess: itemAddedToList.type,
    onBegin: itemAddToListRequested.type,
    onFailed: itemAddToListFailed.type,
  });
