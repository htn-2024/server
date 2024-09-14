import { api } from "../convex/_generated/api.js";
import convexClient from "../convexClient.js";

const memoryController = {
  get: async (req, res) => {
    const memories = await convexClient.query(api.memories.get);
    res.send(memories);
  },

  post: async (req, res) => {
    const file = req.file;
    const uploadUrl = await convexClient.mutation(api.uploads.generateUploadUrl);

    const memoryId = await convexClient.mutation(api.memories.create, { text: "test", secondText: "secondTest" });
    res.send(memoryId);
  }
}

export default memoryController;
