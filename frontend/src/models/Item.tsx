import { Category } from "./Category";
import { ItemList } from "./ItemList";

export interface Item {
  title: string;
  description: string;
  id: number;
  categoryId?: number | null;
  localId?: number;
  Category?: Category;
  ItemList?: ItemList;
}
