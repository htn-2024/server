import { api } from "../convex/_generated/api.js";
import convexClient from "../convexClient.js";

const memoryController = {
  get: async (_, res) => {
    const memories = await convexClient.query(api.memories.get);
    res.json({ memories });
  },

  getByCollectionId: async (req, res) => {
    const { collectionId } = req.params;
    const memories = await convexClient.query(api.memories.getByCollectionId, { collectionId });
    res.json({ memories });
  },

  post: async (req, res) => {
    const { title, description, music, mediaFileId, recordingFileId, collectionId } = req.body;
    const memoryId = await convexClient.mutation(api.memories.create, { 
      title,
      description,
      music,
      mediaFileId,
      recordingFileId,
      collectionId,
    });
    res.json({ memoryId });
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const deletedId = await convexClient.mutation(api.memories.remove, { id });
      res.json({ deletedId });
    } catch (error) {
      res.status(400).json({ error: "Failed to delete memory" });
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const { title, description, music, mediaFileId, recordingFileId } = req.body;

    try {
      const updatedId = await convexClient.mutation(api.memories.update, {
        id,
        body: {
          title,
          description,
          music,
          mediaFileId,
          recordingFileId
        }
      });
      res.json({ updatedId });
    } catch (error) {
      console.error("Error updating memory:", error);
      res.status(400).json({ error: "Failed to update memory" });
    }
  }

}



export default memoryController;
