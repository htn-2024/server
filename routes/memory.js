import express from "express";
import memoryController from "../controllers/memory.js";

const memoryRouter = express.Router();

memoryRouter.get("/", memoryController.get);
memoryRouter.post("/", memoryController.post);

export default memoryRouter;
