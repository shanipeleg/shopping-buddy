import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { List } from "./List";
import { Item } from "./Item";

export class ItemList extends Model<
  InferAttributes<ItemList>,
  InferCreationAttributes<ItemList>
> {
  declare listId: number;
  declare id: number;
  declare itemId: number;
  declare quantity: number;

  public static initialize(connection: Sequelize) {
    this.init(
      {
        listId: {
          type: DataTypes.INTEGER,
          references: {
            model: List,
            key: "id",
          },
        },
        itemId: {
          type: DataTypes.INTEGER,
          references: {
            model: Item,
            key: "id",
          },
        },
        quantity: {
          type: DataTypes.INTEGER,
        },
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
      },
      { sequelize: connection, tableName: "item_lists" }
    );
  }
}

export async function getOneItemList(id: number): Promise<ItemList | null> {
  return await ItemList.findOne({ where: { id } });
}

export async function removeItemList(id: number): Promise<void> {
  const itemList = await ItemList.findByPk(id);
  return await itemList?.destroy();
}

export async function updateQuantity(
  id: number,
  quantity: number
): Promise<ItemList | undefined> {
  const itemList = await ItemList.findByPk(id);
  return await itemList?.update({ quantity });
}

export async function reloadItemList(itemList: ItemList) {
  return await itemList.reload();
}
