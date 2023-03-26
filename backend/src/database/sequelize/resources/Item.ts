import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { connection } from "../connection";
import CreateItemDTO from "../../../resources/items/dtos/create-item.dto";
import UpdateItemDTO from "../../../resources/items/dtos/update-item.dto";
import { List } from "./List";

class Item extends Model<InferAttributes<Item>, InferCreationAttributes<Item>> {
  declare title: string;
  declare description: string;
  declare listId: number;
}

Item.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    listId: {
      type: DataTypes.INTEGER,

      references: {
        model: List,

        key: "id",
      },
    },
  },
  { sequelize: connection }
);

export async function createItem(formBody: CreateItemDTO): Promise<Item> {
  return await Item.create(formBody);
}

export async function getCategories(): Promise<Item[]> {
  return await Item.findAll();
}

export async function getOneItem(id: number): Promise<Item | null> {
  return await Item.findByPk(id);
}

export async function updateItem(
  id: number,
  formBody: UpdateItemDTO
): Promise<Item | null> {
  const item = await Item.findByPk(id);
  if (!item) {
    throw new Error("Could not find item!");
  }
  return await item.update(formBody);
}

export async function removeItem(id: number) {
  const item = await Item.findByPk(id);
  if (!item) {
    throw new Error("Could not find item!");
  }
  await item.destroy();
  return item;
}

export async function getAlItemslByList(listId: number) {
  return await Item.findAll({ where: { listId } });
}
