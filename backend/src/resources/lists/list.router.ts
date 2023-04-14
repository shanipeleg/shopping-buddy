import { Router, Request, Response, NextFunction } from "express";
import { FindByID } from "../../utils/types";
import { create, getAll, getOne, remove, update } from "./list.service";
import CreateListDTO from "./dtos/create-list.dto";
import UpdateListDTO from "./dtos/update-list.dto";

const router = Router();

router.get(
  "/:id",
  async (req: Request<FindByID>, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const list = await getOne(id);
      res.json(list);
    } catch (error) {
      next(error);
    }
  }
);

router.get("/", async (_, res: Response) => {
  const lists = await getAll();
  res.json(lists);
});

router.post("/", async (req: Request<CreateListDTO>, res: Response) => {
  const formBody = req.body as CreateListDTO;
  const list = await create(formBody);
  res.json(list);
});

router.put("/:id", async (req: Request<FindByID>, res: Response) => {
  const formBody = req.body as UpdateListDTO;
  const { id } = req.params;
  const list = await update(id, formBody);
  res.json(list);
});

router.delete("/:id", async (req: Request<FindByID>, res: Response) => {
  const { id } = req.params;
  const list = await remove(id);
  res.json(list);
});

export default router;
