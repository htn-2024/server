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
  args: { text: v.string(), secondText: v.string() },
  handler: async (ctx, args) => {
    const memoryId = await ctx.db.insert("memories", { text: args.text, secondText: args.secondText });
    return memoryId;
  }
});
