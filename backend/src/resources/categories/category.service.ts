import {
  Category,
  createCategory,
  getCategories,
  getOneCategory,
  removeCategory,
  updateCategory,
} from "../../database/sequelize/resources/Category";
import EntityNotFound, { entities } from "../../exceptions/EntityNotFound";

import CreateCategoryDTO from "./dtos/create-category.dto";
import UpdateCategoryDTO from "./dtos/update-category.dto";

async function create(formBody: CreateCategoryDTO): Promise<Category> {
  return await createCategory(formBody);
}

async function getAll(): Promise<Category[]> {
  return await getCategories();
}

async function getOne(id: number) {
  const category = await getOneCategory(id);
  if (!category) {
    throw new EntityNotFound(entities.CATEGORIES, id);
  }
  return category;
}

async function update(id: number, formBody: UpdateCategoryDTO) {
  return await updateCategory(id, formBody);
}

async function remove(id: number) {
  return await removeCategory(id);
}

export { create, getAll, getOne, update, remove };
