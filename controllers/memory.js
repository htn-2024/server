import { api } from "../convex/_generated/api.js";
import convexClient from "../convexClient.js";

const memoryController = {
  get: async (req, res) => {
    const test = await convexClient.query(api.tasks.get);
    console.log(test);
    res.send(test);
  }
}

export default memoryController;
