import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

import CreateItemDTO from "../../../resources/items/dtos/create-item.dto";
import UpdateItemDTO from "../../../resources/items/dtos/update-item.dto";
import { Category } from "./Category";

export class Item extends Model<
  InferAttributes<Item>,
  InferCreationAttributes<Item>
> {
  declare title: string;
  declare description: string;
  declare categoryId?: number;

  public static initialize(connection: Sequelize) {
    this.init(
      {
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        categoryId: {
          type: DataTypes.INTEGER,
          references: {
            model: Category,
            key: "id",
          },
        },
      },
      { sequelize: connection }
    );
  }
}

export async function createItem(formBody: CreateItemDTO): Promise<Item> {
  return await Item.create(formBody);
}

export async function getItems(): Promise<Item[]> {
  return await Item.findAll();
}

export async function findOrCreateItemByTitle(
  formBody: CreateItemDTO
): Promise<Item> {
  const [result, _] = await Item.findOrCreate({
    where: { title: formBody.title },
    defaults: formBody,
  });
  return result;
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

export async function getAlItemslByCategory(categoryId: number) {
  return await Item.findAll({ where: { categoryId } });
}
