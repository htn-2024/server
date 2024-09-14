import express from "express";
import memoryRouter from "./routes/memory.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
const port = process.env.PORT;

const app = express();

app.use('/memory', memoryRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
