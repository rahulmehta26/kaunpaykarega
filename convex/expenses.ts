import { v } from "convex/values";
import { query } from "./_generated/server";
import { internal } from "./_generated/api";

interface Expense {
  _id: string;
  paidByUserId: string;
  splits: { userId: string; amount: number; paid: boolean }[];
  date: number;
}

interface Settlement {
  _id: string;
  paidByUserId: string;
  receivedByUserId: string;
  amount: number;
  date: number;
}

interface OtherUser {
  id: string;
  name: string;
  email: string;
  imageUrl?: string;
}

interface ExpensesResult {
  expenses: Expense[];
  settlements: Settlement[];
  otherUser: OtherUser;
  balance: number;
}

export const getExpensesBetweenUsers = query({
  args: { userId: v.id("users") },
  handler: async (ctx, { userId }): Promise<ExpensesResult> => {
    const me = await ctx.runQuery(internal.users.getCurrentUser);

    if (me._id === userId) throw new Error("Cannot query yourself");

    // Expenses paid by me
    const myPaid = await ctx.db
      .query("expenses")
      .withIndex("by_user_and_group", (q) =>
        q.eq("paidByUserId", me._id).eq("groupId", undefined)
      )
      .collect();

    // Expenses paid by them
    const theyPaid = await ctx.db
      .query("expenses")
      .withIndex("by_user_and_group", (q) =>
        q.eq("paidByUserId", userId).eq("groupId", undefined)
      )
      .collect();

    const candidateExpenses = [...myPaid, ...theyPaid];

    // Filter expenses involving both users
    const expenses = candidateExpenses.filter((e) => {
      const meInSplits = e.splits.some((s) => s.userId === me._id);
      const themInSplits = e.splits.some((s) => s.userId === userId);

      const meInvolved = e.paidByUserId === me._id || meInSplits;
      const themInvolved = e.paidByUserId === userId || themInSplits;

      return meInvolved && themInvolved;
    });

    expenses.sort((a, b) => b.date - a.date);

    // Fetch settlements between users
    const settlements = await ctx.db
      .query("settlements")
      .filter((q) =>
        q.and(
          q.eq(q.field("groupId"), undefined),
          q.or(
            q.and(
              q.eq(q.field("paidByUserId"), me._id),
              q.eq(q.field("receivedByUserId"), userId)
            ),
            q.and(
              q.eq(q.field("paidByUserId"), userId),
              q.eq(q.field("receivedByUserId"), me._id)
            )
          )
        )
      )
      .collect();

    settlements.sort((a, b) => b.date - a.date);

    // Calculate balance
    let balance = 0;
    for (const e of expenses) {
      if (e.paidByUserId === me._id) {
        const split = e.splits.find((s) => s.userId === userId && !s.paid);
        if (split) balance += split.amount;
      } else {
        const split = e.splits.find((s) => s.userId === me._id && !s.paid);
        if (split) balance -= split.amount;
      }
    }

    for (const s of settlements) {
      if (s.paidByUserId === me._id) balance += s.amount;
      else balance -= s.amount;
    }

    // Get other user details
    const other = await ctx.db.get(userId);
    if (!other) throw new Error("User not found");

    return {
      expenses,
      settlements,
      otherUser: {
        id: other._id,
        name: other.name,
        email: other.email,
        imageUrl: other.imageUrl,
      },
      balance,
    };
  },
});
