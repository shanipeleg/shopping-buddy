import express from "express";
import mainRouter from "./src/core/router";
import cors from "cors";
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { testDatabaseConnection } from "./src/database/sequelize/connection";
dotenv.config();

export function createServer() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(mainRouter);
  return app;
}

if (require.main === module) {
  const app = createServer();
  const port = process.env["PORT"];
  app.listen(port, () => {
    console.log(`Backend started on port ${port}`);
    testDatabaseConnection();
  });
}
