import { createAction } from "@reduxjs/toolkit";

type apiPayload = {
  url: string;
  method: string;
  data?: any;
  onSuccess?: string;
  onBegin?: string;
  onFailed?: string;
};

export const apiCallBegan = createAction<apiPayload>("api/CallBegan");
export const apiCallSuccess = createAction("api/CallSuccess");
export const apiCallFailed = createAction("api/CallFailed");
