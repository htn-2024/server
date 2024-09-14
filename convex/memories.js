import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const memories = await ctx.db.query("memories").collect();
    return memories;
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
