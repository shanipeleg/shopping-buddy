import {
  createList,
  getCategories,
  getOneList,
  removeList,
  updateList,
} from "../../database/sequelize/resources/List";
import List from "./list.model";
import CreateListDTO from "./dtos/create-list.dto";
import UpdateListDTO from "./dtos/update-list.dto";

async function create(formBody: CreateListDTO): Promise<List> {
  return await createList(formBody);
}

async function getAll(): Promise<List[]> {
  return await getCategories();
}

async function getOne(id: number) {
  return await getOneList(id);
}

async function update(id: number, formBody: UpdateListDTO) {
  return await updateList(id, formBody);
}

async function remove(id: number) {
  return await removeList(id);
}

export { create, getAll, getOne, update, remove };
