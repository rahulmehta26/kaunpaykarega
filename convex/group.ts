import { v } from "convex/values";
import { query } from "./_generated/server"; 
import { internal } from "./_generated/api";

export const getGroupExpenses = query({
    args: { groupId: v.id("groups") },
    handler: async (ctx, { groupId }) => {
        
        const currentUser = await ctx.runQuery(internal.users.getCurrentUser);

        const group = await ctx.db.get(groupId);
        if (!group) throw new Error("Group not found");

        if (!group.members.some((s) => s.userId === currentUser._id))
            throw new Error("You are not a member of this group");

        const expenses = await ctx.db
            .query("expenses")
            .withIndex("by_group", (q) => q.eq("groupId", groupId))
            .collect();
        
        const settlements = await ctx.db
            .query("settlements")
            .filter((q) => q.eq(q.field("groupId"), groupId))
            .collect();

        const memberDetails = await Promise.all(

            group.members.map(async (m) => {
                const u = await ctx.db.get(m.userId);

                return {
                    id: u?._id,
                    name: u?.name,
                    imageUrl: u?.imageUrl,
                    role: m.role,
                }
            }  )
        )

        const ids = memberDetails.map((m) => m.id)
        
        // Balance Calculation setup
        // -------------------------
        // Initialize totals object to track overall balance for each user
        // Format: { userId: balance1, userId2: balance2, ... }

        const totals = Object.fromEntries(ids.map((id) => [id, 0]));

        // Create a two-dimensional ledger to track who owes whom
        // ledger[A][B] = how much A owes B

        const ledger = {};

        ids.forEach((a) => {
            ledger[a] = {};

            ids.forEach((b) => {
                if (a != b) ledger[a][b] = 0;
            })
        } )
    }
})