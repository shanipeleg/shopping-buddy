import { ItemList } from "./ItemList";

export interface Item {
  title: string;
  description: string;
  id: number;
  localId?: number;
  ItemList?: ItemList;
}
