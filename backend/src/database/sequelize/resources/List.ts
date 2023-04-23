import {
  BelongsToManyAddAssociationMixin,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import CreateListDTO from "../../../resources/lists/dtos/create-list.dto";
import UpdateListDTO from "../../../resources/lists/dtos/update-list.dto";
import { Category } from "./Category";
import { Item } from "./Item";

export class List extends Model<
  InferAttributes<List>,
  InferCreationAttributes<List>
> {
  declare title: string;
  declare description: string;
  declare addItem: BelongsToManyAddAssociationMixin<Item, number>;

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
      },
      { sequelize: connection, tableName: "lists" }
    );
  }
}

export async function createList(formBody: CreateListDTO): Promise<List> {
  return await List.create(formBody);
}

export async function getCategories(): Promise<List[]> {
  return await List.findAll({});
}

export async function getOneList(id: number): Promise<List | null> {
  return await List.findByPk(id, {
    include: [
      {
        model: Item,
        through: {
          attributes: ["id", "quantity"],
        },
        include: [
          {
            model: Category,
            attributes: ["id", "title", "icon"],
          },
        ],
      },
    ],
  });
}

export async function reloadList(list: List): Promise<List> {
  return await list.reload();
}

export async function updateList(
  id: number,
  formBody: UpdateListDTO
): Promise<List | null> {
  const list = await List.findByPk(id);
  if (!list) {
    throw new Error("Could not find list!");
  }
  return await list.update(formBody);
}

export async function removeList(id: number) {
  const list = await List.findByPk(id);
  if (!list) {
    throw new Error("Could not find list!");
  }
  return await list.destroy();
}

export async function addItemToList(list: List, item: Item) {
  await list.addItem(item);
}
