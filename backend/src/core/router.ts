import { Router } from "express";
import categoryRouter from "../resources/categories/category.router";
import listRouter from "../resources/lists/list.router";
import itemRouter from "../resources/items/item.router";

const router = Router();

router.use("/categories", categoryRouter);
router.use("/lists", listRouter);
router.use("/items", itemRouter);

export default router;
