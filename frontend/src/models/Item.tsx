import { Category } from "./Category";
import { ItemList } from "./ItemList";

export interface Item {
  title: string;
  description: string;
  id: number;
  categoryId?: number;
  localId?: number;
  Category?: Category;
  ItemList?: ItemList;
}
