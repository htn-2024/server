import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const memories = await ctx.db.query("memories").collect();
    return Promise.all(
      memories.map(async (memory) => ({
        ...memory,
        recordingUrl: await ctx.storage.getUrl(memory.recordingFileId)
      }))
    )
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    music: v.string(),
    recordingFileId: v.string()
  },
  handler: async (ctx, args) => {
    const memoryId = await ctx.db.insert("memories", args);
    return memoryId;
  }
});
