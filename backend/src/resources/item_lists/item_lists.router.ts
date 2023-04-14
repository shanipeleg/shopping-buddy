import { Router, Request, Response, NextFunction } from "express";
import { FindByID } from "../../utils/types";
import addItemToListDTO from "./dtos/add-item-to-list.dto";
import updateQuantityDTO from "./dtos/update-quantity.dto";
import { addItemToList, updateItemListQuantity } from "./item_lists.service";

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

router.put(
  "/:id",
  async (req: Request<FindByID>, res: Response, next: NextFunction) => {
    try {
      const formBody = req.body as updateQuantityDTO;
      const { id } = req.params;
      const result = await updateItemListQuantity(id, formBody);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
