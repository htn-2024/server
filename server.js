import express from "express";
import bodyParser from "body-parser";
import memoryRouter from "./routes/memory.js";
import uploadRouter from "./routes/upload.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });
const port = process.env.PORT;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/memory", memoryRouter);
app.use("/upload", uploadRouter);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
