import { configureStore } from "@reduxjs/toolkit";
import { api } from "./middlewares/api";
import reducer from "./reducers";

export const store = configureStore({ reducer, middleware: [api] });

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
export type RootStore = typeof store;
