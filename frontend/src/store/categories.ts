import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { Category } from "../models/Category";
import { HTTP_METHODS } from "../utils/consts";
import { apiCallBegan } from "./api";
import { RootState } from "./configureStore";

interface CategoriesState {
  data: Category[];
  loadingFetching: boolean;
  errorFetching: string | null;
  loadingCreating: boolean;
  errorCreating: null | string;
}

const initialState: CategoriesState = {
  data: [],
  loadingFetching: false,
  errorFetching: null,
  loadingCreating: false,
  errorCreating: null,
};

const slice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    categoriesFetchingRequested: (state: CategoriesState) => {
      state.loadingFetching = true;
    },
    categoriesFetchingFailed: (
      state: CategoriesState,
      action: PayloadAction<AxiosError>
    ) => {
      state.errorFetching =
        typeof action.payload.response?.data === "string"
          ? action.payload.response?.data
          : "Unknown Error!";
      state.loadingFetching = false;
    },
    categoriesFetched: (
      state: CategoriesState,
      action: PayloadAction<Category[]>
    ) => {
      state.data = action.payload;
      state.loadingFetching = false;
    },
  },
});

export default slice.reducer;
const {
  categoriesFetched,
  categoriesFetchingRequested,
  categoriesFetchingFailed,
} = slice.actions;

//Selectors
export function getCategories(state: RootState) {
  return state.categories.data;
}

export function getLoadingFetching(state: RootState) {
  return state.categories.loadingFetching;
}

export function getErrorFetching(state: RootState) {
  return state.categories.errorFetching;
}

const url = "categories";

//Actions
export const fetchCategories = () =>
  apiCallBegan({
    url,
    method: HTTP_METHODS.GET,
    onSuccess: categoriesFetched.type,
    onBegin: categoriesFetchingRequested.type,
    onFailed: categoriesFetchingFailed.type,
  });
