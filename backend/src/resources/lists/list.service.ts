import { Item } from "../../database/sequelize/resources/Item";
import {
  addItemToList,
  createList,
  getLists,
  getOneList,
  List,
  removeList,
  updateList,
} from "../../database/sequelize/resources/List";
import EntityNotFound, { entities } from "../../exceptions/EntityNotFound";

import CreateListDTO from "./dtos/create-list.dto";
import UpdateListDTO from "./dtos/update-list.dto";

async function create(formBody: CreateListDTO): Promise<List> {
  return await createList(formBody);
}

async function addToList(list: List, item: Item) {
  return await addItemToList(list, item);
}

async function getAll(): Promise<List[]> {
  return await getLists();
}

async function getOne(id: number) {
  const list = await getOneList(id);
  if (!list) {
    throw new EntityNotFound(entities.LISTS, id);
  }
  return list;
}

async function update(id: number, formBody: UpdateListDTO) {
  return await updateList(id, formBody);
}

async function remove(id: number) {
  return await removeList(id);
}

export { create, getAll, getOne, update, remove, addToList };
