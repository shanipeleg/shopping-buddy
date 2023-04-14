import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { List, ListToCreate } from "../models/List";
import { apiCallBegan } from "./api";
import { RootState } from "./configureStore";

interface ListState {
  data: List[];
  dataById: { [key: number]: List };
  loadingFetching: boolean;
  errorFetching: string | null;
  loadingCreating: boolean;
  errorCreating: null | string;
}

const initialState: ListState = {
  data: [],
  dataById: {},
  loadingFetching: false,
  errorFetching: null,
  loadingCreating: false,
  errorCreating: null,
};

const slice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    listCreationRequested: (state: ListState) => {
      state.loadingCreating = true;
    },
    listCreationFailed: (state: ListState) => {
      state.loadingCreating = false;
    },
    listCreated: (state: ListState, action: PayloadAction<List>) => {
      state.data.push(action.payload);
      state.loadingCreating = false;
    },
    listFetchingRequested: (state: ListState) => {
      state.loadingFetching = true;
    },
    listFetchingFailed: (
      state: ListState,
      action: PayloadAction<AxiosError>
    ) => {
      state.errorFetching =
        typeof action.payload.response?.data === "string"
          ? action.payload.response?.data
          : "Unknown Error!";
      state.loadingFetching = false;
    },
    listsFetched: (state: ListState, action: PayloadAction<List[]>) => {
      state.data = action.payload;
      action.payload.forEach((list) => {
        state.dataById[list.id] = list;
      });
      state.loadingFetching = false;
    },
    listFetched: (state: ListState, action: PayloadAction<List>) => {
      state.dataById[action.payload.id] = action.payload;
      state.loadingFetching = false;
    },
  },
});

export default slice.reducer;
const {
  listsFetched,
  listCreated,
  listCreationRequested,
  listCreationFailed,
  listFetchingFailed,
  listFetchingRequested,
  listFetched,
} = slice.actions;

//Selectors
export function getLists(state: RootState) {
  return state.lists.data;
}

export function getCreationLoading(state: RootState) {
  return state.lists.loadingCreating;
}

export function getCreationError(state: RootState) {
  return state.lists.errorCreating;
}

export function getLoadingFetching(state: RootState) {
  return state.lists.loadingFetching;
}

export function getErrorFetching(state: RootState) {
  return state.lists.errorFetching;
}

export const getListByLocalId = (state: RootState, localId: number) => {
  return state.lists.data.find((list) => list.localId === localId);
};

export const getListById = (state: RootState, id: number) => {
  return state.lists.dataById[id];
};

const url = "lists";

//Actions
export const fetchLists = () =>
  apiCallBegan({
    url,
    method: "get",
    onSuccess: listsFetched.type,
    onBegin: listFetchingRequested.type,
    onFailed: listFetchingFailed.type,
  });

export const fetchList = (id: number) =>
  apiCallBegan({
    url: `${url}/${id}`,
    method: "get",
    onSuccess: listFetched.type,
    onFailed: listFetchingFailed.type,
    onBegin: listFetchingRequested.type,
  });

export const addList = (data: ListToCreate) =>
  apiCallBegan({
    url,
    data,
    method: "post",
    onSuccess: listCreated.type,
    onBegin: listCreationRequested.type,
    onFailed: listCreationFailed.type,
  });
