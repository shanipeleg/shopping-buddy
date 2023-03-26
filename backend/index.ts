import express from "express";
import mainRouter from "./src/core/router";
import dotenv from "dotenv";
import { testDatabaseConnection } from "./src/database/sequelize/connection";
dotenv.config();

const app = express();
const port = process.env["PORT"];
app.use(express.json());
app.use(mainRouter);

app.listen(port, async () => {
  console.log("Backend working");
  testDatabaseConnection();
});
