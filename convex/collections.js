import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const collections = await ctx.db.query("collections").collect();
    return collections;
  },
});

export const create = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const collectionId = await ctx.db.insert("collections", args);
    return collectionId;
  }
});
