import { Router, Request, Response } from "express";
import { FindByID } from "../../utils/types";
import { create, getAll, getOne, remove, update } from "./category.service";
import CreateCategoryDTO from "./dtos/create-category.dto";
import UpdateCategoryDTO from "./dtos/update-category.dto";

const router = Router();

router.get("/:id", async (req: Request<FindByID>, res: Response) => {
  const { id } = req.params;
  const categories = await getOne(id);
  res.json(categories);
});

router.get("/", async (_, res: Response) => {
  const categories = await getAll();
  res.json(categories);
});

router.post("/", async (req: Request<CreateCategoryDTO>, res: Response) => {
  const formBody = req.body as CreateCategoryDTO;
  const category = await create(formBody);
  res.json(category);
});

router.put("/:id", async (req: Request<FindByID>, res: Response) => {
  const formBody = req.body as UpdateCategoryDTO;
  const { id } = req.params;
  const category = await update(id, formBody);
  res.json(category);
});

router.delete("/:id", async (req: Request<FindByID>, res: Response) => {
  const { id } = req.params;
  const category = await remove(id);
  res.json(category);
});

export default router;
