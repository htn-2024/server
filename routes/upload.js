import express from "express";
import uploadController from "../controllers/upload.js";

const uploadRouter = express.Router();

uploadRouter.post("/", uploadController.post);

export default uploadRouter;
