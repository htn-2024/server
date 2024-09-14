import { api } from "../convex/_generated/api.js";
import convexClient from "../convexClient.js";

const memoryController = {
  get: async (_, res) => {
    const memories = await convexClient.query(api.memories.get);
    res.send(memories);
  },

  post: async (req, res) => {
    const { title, description, music, recordingFileId } = req.body;
    const memoryId = await convexClient.mutation(api.memories.create, { 
      title,
      description,
      music,
      recordingFileId
    });
    res.send(memoryId);
  }
}

export default memoryController;
