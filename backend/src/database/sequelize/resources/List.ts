import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { connection } from "../connection";
import CreateListDTO from "../../../resources/lists/dtos/create-list.dto";
import UpdateListDTO from "../../../resources/lists/dtos/update-list.dto";

export class List extends Model<
  InferAttributes<List>,
  InferCreationAttributes<List>
> {
  declare title: string;
  declare description: string;
}

List.init(
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
  { sequelize: connection }
);

export async function createList(formBody: CreateListDTO): Promise<List> {
  return await List.create(formBody);
}

export async function getCategories(): Promise<List[]> {
  return await List.findAll();
}

export async function getOneList(id: number): Promise<List | null> {
  return await List.findByPk(id);
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
