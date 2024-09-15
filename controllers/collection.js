import { api } from "../convex/_generated/api.js";
import convexClient from "../convexClient.js";

const collectionController = {
  get: async (_, res) => {
    const collections = await convexClient.query(api.collections.get);
    res.json({ collections });
  },

  post: async (req, res) => {
    const { name } = req.body;
    const collectionId = await convexClient.mutation(api.collections.create, { 
      name
    });
    res.json({ collectionId });
  },
}

export default collectionController;
