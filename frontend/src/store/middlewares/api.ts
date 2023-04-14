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
        baseURL: "http://localhost:8000/", //TODO env
        url,
        data,
        method,
      });

      if (onSuccess) {
        const payload = data.localId
          ? { ...response.data, localId: data.localId }
          : response.data;
        storeApi.dispatch({ type: onSuccess, payload });
      }
    } catch (error) {
      if (onFailed) {
        storeApi.dispatch({ type: onFailed, payload: error });
      }
    }
  };
