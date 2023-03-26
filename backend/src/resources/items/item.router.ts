import { Router, Request, Response } from "express";
import { FindByID } from "../../utils/types";
import { create, getAll, getOne, remove, update } from "./item.service";
import CreateItemDTO from "./dtos/create-item.dto";
import UpdateItemDTO from "./dtos/update-item.dto";

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

router.post("/", async (req: Request<CreateItemDTO>, res: Response) => {
  try {
    const formBody = req.body as CreateItemDTO;
    const item = await create(formBody);
    res.json(item);
  } catch (e) {
    res.status(500).send("Error!");
  }
});

router.put("/:id", async (req: Request<FindByID>, res: Response) => {
  const formBody = req.body as UpdateItemDTO;
  const { id } = req.params;
  const item = await update(id, formBody);
  res.json(item);
});

router.delete("/:id", async (req: Request<FindByID>, res: Response) => {
  const { id } = req.params;
  const item = await remove(id);
  res.json(item);
});

export default router;
