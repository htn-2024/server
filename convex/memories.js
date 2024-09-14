import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    // Fetch all memories from the database
    const memories = await ctx.db.query("memories").collect();

    return Promise.all(
      memories.map(async (memory) => {
        try {
          const mediaUrl = memory.mediaFileId
            ? await ctx.storage.getUrl(memory.mediaFileId)
            : null;

          const recordingUrl = memory.recordingFileId
            ? await ctx.storage.getUrl(memory.recordingFileId)
            : null;

          return {
            ...memory,
            mediaUrl,
            recordingUrl,
          };
        } catch (error) {
          console.error(`Error fetching URLs for memory ID ${memory.id}:`, error);
          return {
            ...memory,
            mediaUrl: null,
            recordingUrl: null,
          };
        }
      })
    );
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    music: v.string(),
    mediaFileId: v.string(),
    recordingFileId: v.string()
  },
  handler: async (ctx, args) => {
    const memoryId = await ctx.db.insert("memories", args);
    return memoryId;
  }
});
