import { Item } from "./Item";

export interface List {
  title: string;
  description: string;
  id: number;
  localId?: number;
  Items?: Item[];
}

export type ListToCreate = Omit<List, "id">;
