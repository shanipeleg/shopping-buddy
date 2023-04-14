import { findOrCreateItemByTitle } from "../../database/sequelize/resources/Item";
import {
  getOneItemList,
  reloadItemList,
  removeItemList,
  updateQuantity,
} from "../../database/sequelize/resources/ItemList";
import { reloadList } from "../../database/sequelize/resources/List";
import EntityNotFound from "../../exceptions/EntityNotFound";

import { getOne as getOneList, addToList } from "../lists/list.service";
import addItemToListDTO from "./dtos/add-item-to-list.dto";
import updateQuantityDTO from "./dtos/update-quantity.dto";

async function addItemToList(formBody: addItemToListDTO, listId: number) {
  const list = await getOneList(listId);
  if (!list) {
    throw new Error("List not found");
  }
  const item = await findOrCreateItemByTitle(formBody);
  await addToList(list, item);
  return await reloadList(list);
}

async function updateItemListQuantity(
  ItemListID: number,
  formBody: updateQuantityDTO
) {
  const ItemList = await getOneItemList(ItemListID);
  if (!ItemList) {
    throw new EntityNotFound("List Item", ItemListID);
  }
  const { quantity } = formBody;
  if (quantity === 0) {
    await removeItemList(ItemListID);
    ItemList.quantity = 0;
    return ItemList;
  } else {
    await updateQuantity(ItemListID, quantity);
    return await reloadItemList(ItemList);
  }
}

export { addItemToList, updateItemListQuantity };
