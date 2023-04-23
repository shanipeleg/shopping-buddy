import { RootState } from "../configureStore";
import { Middleware } from "redux";
import { apiCallBegan } from "../api";
import axios from "axios";

export const api: Middleware<{}, RootState> =
  (storeApi) => (next) => async (action) => {
    if (action.type !== apiCallBegan.type) return next(action);
    const {
      url,
      method,
      onSuccess,
      onBegin,
      onFailed,
      data = {},
    } = action.payload;
    if (onBegin) {
      storeApi.dispatch({ type: onBegin });
    }
    try {
      const response = await axios.request({
        baseURL: process.env.BASE_API,
        url,
        data,
        method,
      });

      if (onSuccess) {
        if (typeof onSuccess === "string") {
          const payload = data.localId
            ? { ...response.data, localId: data.localId }
            : response.data;
          storeApi.dispatch({ type: onSuccess, payload });
        }
        if (Array.isArray(onSuccess)) {
          onSuccess.forEach((successAction) => {
            storeApi.dispatch({ type: successAction, payload: response.data });
          });
        }
      }
    } catch (error) {
      if (onFailed) {
        storeApi.dispatch({ type: onFailed, payload: error });
      }
    }
  };
