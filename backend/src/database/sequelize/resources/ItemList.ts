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
      },
      { sequelize: connection, tableName: "item_lists" }
    );
  }
}
