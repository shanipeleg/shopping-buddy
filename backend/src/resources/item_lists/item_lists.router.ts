import { Router, Request, Response } from "express";
import { FindByID } from "../../utils/types";
import addItemToListDTO from "./dtos/add-item-to-list.dto";
import { addItemToList } from "./item_lists.service";

const router = Router();
router.post(
  "/:id",
  async (req: Request<addItemToListDTO & FindByID>, res: Response) => {
    try {
      const { id } = req.params;
      const formBody = req.body as addItemToListDTO;
      const item = await addItemToList(formBody, id);
      res.json(item);
    } catch (e) {
      res.status(500).send("Error!");
    }
  }
);

export default router;
