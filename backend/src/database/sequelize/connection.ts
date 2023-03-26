const { Sequelize } = require("sequelize");
import dotenv from "dotenv";
dotenv.config();

const { DB, DB_USER, DB_PASSWORD, DB_HOST, DB_DIALECT } = process.env;

export const connection = new Sequelize(DB, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
});

export async function testDatabaseConnection() {
  try {
    await connection.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
