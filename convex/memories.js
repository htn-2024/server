import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

const getFileUrls = (ctx, memories) => {
  return memories.map(async (memory) => {
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
  });
}

export const get = query({
  args: {},
  handler: async (ctx) => {
    // Fetch all memories from the database
    const memories = await ctx.db.query("memories").collect();

    return Promise.all(
      getFileUrls(ctx, memories)
    );
  },
});

export const getByCollectionId = query({
  args: { collectionId: v.id("collections") },
  handler: async (ctx, args) => {
    const { collectionId } = args;
    const memories = await ctx.db.query("memories").filter((q) => q.eq(q.field("collectionId"), collectionId)).collect();

    return Promise.all(
      getFileUrls(ctx, memories)
    );
  }
});

export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    music: v.string(),
    mediaFileId: v.string(),
    recordingFileId: v.string(),
    collectionId: v.id("collections"),
  },
  handler: async (ctx, args) => {
    const memoryId = await ctx.db.insert("memories", args);
    return memoryId;
  }
});

export const remove = mutation({
  args: { id: v.id("memories") },
  handler: async (ctx, args) => {
    const { id } = args;
    await ctx.db.delete(id);
    return id;
  },
});

export const update = mutation({
  args: {
    id: v.id("memories"),
    body: v.object({
      title: v.optional(v.string()),
      description: v.optional(v.string()),
      music: v.optional(v.string()),
      mediaFileId: v.optional(v.string()),
      recordingFileId: v.optional(v.string())
    })
  },
  handler: async (ctx, args) => {
    const { id, body } = args;
    
    // Remove null or undefined properties from the body object
    Object.keys(body).forEach((key) => {
      if (body[key] === null || body[key] === undefined) {
        delete body[key];
      }
    });
    
    await ctx.db.patch(id, body);
    return id;
  }
});



