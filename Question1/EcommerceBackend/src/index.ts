import { config } from "dotenv";
config();

import express from "express";
import NodeCache from "node-cache";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
export const cache = new NodeCache();
import { productRouter } from "./Routes/products.route.js";

app.use("/api/products", productRouter);

app.listen(process.env.PORT, () => {
  console.log("Server is running at  port ", process.env.PORT);
});
