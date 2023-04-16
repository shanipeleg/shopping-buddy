import { ItemList } from "./ItemList";

export interface Item {
  title: string;
  description: string;
  id: number;
  categoryId?: number;
  localId?: number;
  ItemList?: ItemList;
}
