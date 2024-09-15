import express from "express";
import collectionController from "../controllers/collection.js";

const collectionRouter = express.Router();

collectionRouter.get("/", collectionController.get);
collectionRouter.post("/", collectionController.post);

export default collectionRouter;
