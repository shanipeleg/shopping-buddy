import { Item } from "./Item";

export interface List {
  title: string;
  description: string;
  id: number;
  localId?: number;
  Items?: Required<Item>[];
}

export type ListToCreate = Omit<List, "id">;
