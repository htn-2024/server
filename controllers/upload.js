import { api } from "../convex/_generated/api.js";
import convexClient from "../convexClient.js";

const uploadController = {
  post: async (req, res) => {
    const uploadUrl = await convexClient.mutation(api.uploads.generateUploadUrl);

    const result = await fetch(uploadUrl, {
      method: "POST",
      duplex: "half",
      headers: {"Content-Type": req.headers["content-type"]},
      body: req
    });

    const { storageId } = await result.json();
    res.send(storageId);
  }
}

export default uploadController;
