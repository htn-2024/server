import express from "express";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api.js";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const client = new ConvexHttpClient(process.env["CONVEX_URL"]);

const app = express();
const port = 3000;

app.get('/', async (req, res) => {
  const test = await client.query(api.tasks.get);
  console.log(test);
  res.send(test);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});