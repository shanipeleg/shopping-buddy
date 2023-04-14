import { NextFunction, Request, Response } from "express";
import CustomError from "../exceptions/CustomError";

function errorHandler(
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const { status, message } = err;
  res.status(status ?? 500).send(message);
}

export default errorHandler;
