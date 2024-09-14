import express from "express";
import memoryController from "../controllers/memory.js";

const memoryRouter = express.Router();

memoryRouter.get("/", memoryController.get);
memoryRouter.get("/:collectionId", memoryController.getByCollectionId);
memoryRouter.post("/", memoryController.post);
memoryRouter.delete("/:id", memoryController.delete);
memoryRouter.put("/:id", memoryController.update);

export default memoryRouter;
