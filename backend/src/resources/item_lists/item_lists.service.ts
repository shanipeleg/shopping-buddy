import { findOrCreateItemByTitle } from "../../database/sequelize/resources/Item";
import { reloadList } from "../../database/sequelize/resources/List";

import { getOne as getOneList, addToList } from "../lists/list.service";
import addItemToListDTO from "./dtos/add-item-to-list.dto";

async function addItemToList(formBody: addItemToListDTO, listId: number) {
  const list = await getOneList(listId);
  if (!list) {
    throw new Error("List not found");
  }
  const item = await findOrCreateItemByTitle(formBody);
  await addToList(list, item);
  return await reloadList(list);
}

export { addItemToList };
