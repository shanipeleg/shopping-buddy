import {
  createItem,
  getOneItem,
  removeItem,
  getItems,
  updateItem,
  Item,
  findOrCreateItemByTitle,
} from "../../database/sequelize/resources/Item";

import { getOne as getOneList, addToList } from "../lists/list.service";

import CreateItemDTO from "./dtos/create-item.dto";
import UpdateItemDTO from "./dtos/update-item.dto";
import { getOneCategory } from "../../database/sequelize/resources/Category";
import { reloadList } from "../../database/sequelize/resources/List";

async function create(formBody: CreateItemDTO): Promise<Item> {
  if (formBody.categoryId) {
    const category = await getOneCategory(formBody.categoryId);
    if (!category) {
      throw new Error("Could not find category for item!");
    }
  }

  return await createItem(formBody);
}

async function getAll(): Promise<Item[]> {
  return await getItems();
}

async function getOne(id: number) {
  return await getOneItem(id);
}

async function update(id: number, formBody: UpdateItemDTO) {
  return await updateItem(id, formBody);
}

async function remove(id: number) {
  return await removeItem(id);
}

export { create, getAll, getOne, update, remove };
