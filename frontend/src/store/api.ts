import { createAction } from "@reduxjs/toolkit";
import { HTTP_METHODS } from "../utils/consts";

type apiPayload = {
  url: string;
  method: HTTP_METHODS;
  data?: any;
  onSuccess?: string | string[];
  onBegin?: string;
  onFailed?: string;
};

export const apiCallBegan = createAction<apiPayload>("api/CallBegan");
export const apiCallSuccess = createAction("api/CallSuccess");
export const apiCallFailed = createAction("api/CallFailed");
