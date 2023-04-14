import { Router } from "express";
import categoryRouter from "../resources/categories/category.router";
import listRouter from "../resources/lists/list.router";
import itemRouter from "../resources/items/item.router";
import itemListRouter from "../resources/item_lists/item_lists.router";
import errorHandler from "../middlewares/errorHandler";

const router = Router();

router.use("/lists", listRouter);
router.use("/items", itemRouter);
router.use("/items/list", itemListRouter);
router.use("/categories", categoryRouter);

router.use(errorHandler);

export default router;
