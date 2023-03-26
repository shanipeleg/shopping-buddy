import {
  createItem,
  getCategories,
  getOneItem,
  removeItem,
  updateItem,
} from "../../database/sequelize/resources/Item";
import Item from "./item.model";
import CreateItemDTO from "./dtos/create-item.dto";
import UpdateItemDTO from "./dtos/update-item.dto";
import { getOneList } from "../../database/sequelize/resources/List";

async function create(formBody: CreateItemDTO): Promise<Item> {
  const list = await getOneList(formBody.listId);
  if (!list) {
    throw new Error("Could not find list for item!");
  }
  return await createItem(formBody);
}

async function getAll(): Promise<Item[]> {
  return await getCategories();
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
