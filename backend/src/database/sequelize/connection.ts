const { Sequelize } = require("sequelize");
import dotenv from "dotenv";
import { Category } from "./resources/Category";
import { Item } from "./resources/Item";
import { ItemList } from "./resources/ItemList";
import { List } from "./resources/List";
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
    let models = [List, Category, Item, ItemList];
    models.forEach((model) => model.initialize(connection));
    Item.belongsToMany(List, { through: ItemList });
    List.belongsToMany(Item, { through: ItemList });
    Category.hasMany(Item);
    Item.belongsTo(Category);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
