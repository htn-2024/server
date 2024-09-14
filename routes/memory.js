import express from "express";
import memoryController from "../controllers/memory.js";

const memoryRouter = express.Router();

memoryRouter.get("/", memoryController.get);

export default memoryRouter;
