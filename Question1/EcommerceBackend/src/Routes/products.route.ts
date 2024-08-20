import { Router } from "express";
import { getAllProducts } from "../Controllers/product.controller.js";

const productRouter = Router();

productRouter.get(
  "/category/:categoryName/:minPrice/:maxPrice/:n/:page/:sort",
  getAllProducts
);

export { productRouter };
