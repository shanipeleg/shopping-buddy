import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

import CreateCategoryDTO from "../../../resources/categories/dtos/create-category.dto";
import UpdateCategoryDTO from "../../../resources/categories/dtos/update-category.dto";

export class Category extends Model<
  InferAttributes<Category>,
  InferCreationAttributes<Category>
> {
  declare title: string;
  declare description: string;
  declare icon?: string;

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
        icon: {
          type: DataTypes.STRING(20),
          allowNull: false,
        },
      },
      { sequelize: connection }
    );
  }
}

export async function createCategory(
  formBody: CreateCategoryDTO
): Promise<Category> {
  return await Category.create(formBody);
}

export async function getCategories(): Promise<Category[]> {
  return await Category.findAll();
}

export async function getOneCategory(id: number): Promise<Category | null> {
  return await Category.findByPk(id);
}

export async function updateCategory(
  id: number,
  formBody: UpdateCategoryDTO
): Promise<Category | null> {
  const category = await Category.findByPk(id);
  if (!category) {
    throw new Error("Could not find category!");
  }
  return await category.update(formBody);
}

export async function removeCategory(id: number) {
  const category = await Category.findByPk(id);
  if (!category) {
    throw new Error("Could not find category!");
  }
  return await category.destroy();
}
