import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../models/Category";
import { Item } from "../models/Item";
import { ItemList } from "../models/ItemList";
import { List } from "../models/List";
import { HTTP_METHODS } from "../utils/consts";
import { apiCallBegan } from "./api";
import { RootState } from "./configureStore";

interface ItemListsState {
  dataById: { [key: number]: Required<Item>[] };
  loadingAddingToList: boolean;
  errorAddingToList: null | string;
}

const initialState: ItemListsState = {
  dataById: {},
  loadingAddingToList: false,
  errorAddingToList: null,
};

const slice = createSlice({
  name: "itemsLists",
  initialState,
  reducers: {
    itemAddToListRequested: (state: ItemListsState) => {
      state.loadingAddingToList = true;
    },
    itemAddToListFailed: (state: ItemListsState) => {
      state.loadingAddingToList = false;
    },
    itemAddedToList: (state: ItemListsState, action: PayloadAction<List>) => {
      state.loadingAddingToList = false;
      const { id, Items } = action.payload;
      if (Items) state.dataById[id] = Items;
    },
    listItemsFetched: (state: ItemListsState, action: PayloadAction<List>) => {
      state.loadingAddingToList = false;
      const { id, Items } = action.payload;
      if (Items) state.dataById[id] = Items;
    },
    updateItemCategoryInLists: (
      state: ItemListsState,
      action: PayloadAction<Required<Item>>
    ) => {
      Object.keys(state.dataById).forEach((key: string) => {
        let items = state.dataById[Number(key)];
        const { id, categoryId, Category } = action.payload;
        state.dataById[Number(key)] = items.map((item) => {
          if (item.id === id) {
            item.categoryId = categoryId;
            item.Category = Category;
          }
          return item;
        });
      });
    },
    listItemQuantityUpdated: (
      state: ItemListsState,
      action: PayloadAction<ItemList>
    ) => {
      const { id, listId, quantity } = action.payload;
      const listItems = state.dataById[listId];
      const index = listItems.findIndex(
        (listItem) => listItem.ItemList.id === id
      );
      if (index !== -1) {
        if (quantity === 0) {
          state.dataById[listId] = listItems.filter(
            (listItem) => listItem.ItemList.id !== id
          );
        } else {
          listItems[index].ItemList.quantity = quantity;
        }
      }
    },
  },
});

export default slice.reducer;
const {
  itemAddToListRequested,
  itemAddToListFailed,
  itemAddedToList,
  listItemQuantityUpdated,
} = slice.actions;

export const { listItemsFetched, updateItemCategoryInLists } = slice.actions;

//Selectors
export function getListItems(state: RootState, listId: number) {
  return state.itemsLists.dataById[listId];
}

export function getListItemsKeyedByCategory(state: RootState, itemId: number) {
  const items = state.itemsLists.dataById[itemId];
  const categories: { [key: string]: Category & { items: Item[] } } = {};
  if (items) {
    items.forEach((item) => {
      let category = item.Category ?? { id: 0, title: "No Category" };
      let items = categories[category.id]?.items
        ? [...categories[category.id].items, item]
        : [item];
      categories[category.id] = { ...category, items };
    });
  }
  return Object.values(categories);
}

const url = "items/list";

//Actions
export const addItemToList = (itemTitle: string, listId: number) =>
  apiCallBegan({
    url: `${url}/${listId}`,
    data: { title: itemTitle, description: "" },
    method: HTTP_METHODS.POST,
    onSuccess: itemAddedToList.type,
    onBegin: itemAddToListRequested.type,
    onFailed: itemAddToListFailed.type,
  });

export const updateQuantityOfListItem = (
  itemListId: number,
  quantity: number
) =>
  apiCallBegan({
    url: `${url}/${itemListId}`,
    data: { quantity },
    method: HTTP_METHODS.PUT,
    onSuccess: listItemQuantityUpdated.type,
  });
