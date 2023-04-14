import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { Item } from "../models/Item";
import { List, ListToCreate } from "../models/List";
import { apiCallBegan } from "./api";
import { RootState } from "./configureStore";

interface ItemState {
  data: Item[];
  dataById: { [key: number]: Item };
  loadingFetching: boolean;
  errorFetching: string | null;
  loadingCreating: boolean;
  errorCreating: null | string;
}

const initialState: ItemState = {
  data: [],
  dataById: {},
  loadingFetching: false,
  errorFetching: null,
  loadingCreating: false,
  errorCreating: null,
};

const slice = createSlice({
  name: "items",
  initialState,
  reducers: {
    itemFetchingRequested: (state: ItemState) => {
      state.loadingFetching = true;
    },
    itemFetchingFailed: (
      state: ItemState,
      action: PayloadAction<AxiosError>
    ) => {
      state.errorFetching =
        typeof action.payload.response?.data === "string"
          ? action.payload.response?.data
          : "Unknown Error!";
      state.loadingFetching = false;
    },
    itemsFetched: (state: ItemState, action: PayloadAction<Item[]>) => {
      state.data = action.payload;
      action.payload.forEach((item) => {
        state.dataById[item.id] = item;
      });
      state.loadingFetching = false;
    },
    itemFetched: (state: ItemState, action: PayloadAction<Item>) => {
      state.dataById[action.payload.id] = action.payload;
      state.loadingFetching = false;
    },
  },
});

export default slice.reducer;
const { itemsFetched, itemFetchingFailed, itemFetchingRequested } =
  slice.actions;

//Selectors
export function getItems(state: RootState) {
  return state.items.data;
}

export function getCreationLoading(state: RootState) {
  return state.items.loadingCreating;
}

export function getCreationError(state: RootState) {
  return state.items.errorCreating;
}

export function getLoadingFetching(state: RootState) {
  return state.items.loadingFetching;
}

export function getErrorFetching(state: RootState) {
  return state.items.errorFetching;
}

export const getLItemByLocalId = (state: RootState, localId: number) => {
  return state.items.data.find((item) => item.localId === localId);
};

export const getItemById = (state: RootState, id: number) => {
  return state.items.dataById[id];
};

const url = "items";

//Actions
export const fetchItems = () =>
  apiCallBegan({
    url,
    method: "get",
    onSuccess: itemsFetched.type,
    onBegin: itemFetchingRequested.type,
    onFailed: itemFetchingFailed.type,
  });
