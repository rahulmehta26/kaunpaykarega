import { internal } from "./_generated/api";
import type { Id } from "./_generated/dataModel";
import { query } from "./_generated/server";

// Types

type User = {
  _id: Id<"users">;
  _creationTime: number;
  name: string;
  email?: string;
  imageUrl?: string;
  tokenIdentifier?: string;
};

type Split = {
  userId: Id<"users">;
  amount: number;
  paid?: boolean;
};

type Expense = {
  _id: Id<"expenses">;
  _creationTime: number;
  date: number; 
  paidByUserId: Id<"users">;
  groupId?: Id<"groups">;
  splits: Split[];
  
};

type Settlement = {
  _id: Id<"settlements">;
  _creationTime: number;
  groupId?: Id<"groups">;
  paidByUserId: Id<"users">;
  receivedByUserId: Id<"users">;
  amount: number;
};

type Group = {
  _id: Id<"groups">;
  _creationTime: number;
  name: string;
  members: { userId: Id<"users">; role?: string }[];
};

// Getting Balance

export const getUserBalance = query({
  handler: async (
    ctx
  ): Promise<{
    youOwe: number;
    youAreOwed: number;
    totalBalance: number;
    oweDetails: {
      youOwe: { userId: string; name: string; imageUrl?: string; amount: number }[];
      youAreOwedBy: { userId: string; name: string; imageUrl?: string; amount: number }[];
    };
  }> => {
    const user = (await ctx.runQuery(internal.users.getCurrentUser)) as User;

    const expenses = (await ctx.db.query("expenses").collect()) as Expense[];
    const relevantExpenses = expenses.filter(
      (e) =>
        !e.groupId &&
        (e.paidByUserId === user._id || e.splits.some((s) => s.userId === user._id))
    );

    let youOwe = 0;
    let youAreOwed = 0;
    const balanceByUser: Record<string, { owed: number; owing: number }> = {};

    for (const e of relevantExpenses) {
      const isPayer = e.paidByUserId === user._id;
      const mySplit = e.splits.find((s) => s.userId === user._id);

      if (isPayer) {
        for (const s of e.splits) {
          if (s.userId === user._id || s.paid) continue;
          youAreOwed += s.amount;
          (balanceByUser[s.userId as string] ??= { owed: 0, owing: 0 }).owed += s.amount;
        }
      } else if (mySplit && !mySplit.paid) {
        youOwe += mySplit.amount;
        (balanceByUser[e.paidByUserId as string] ??= { owed: 0, owing: 0 }).owing += mySplit.amount;
      }
    }

    const settlementsAll = (await ctx.db.query("settlements").collect()) as Settlement[];
    const settlements = settlementsAll.filter(
      (s) => !s.groupId && (s.paidByUserId === user._id || s.receivedByUserId === user._id)
    );

    for (const s of settlements) {
      if (s.paidByUserId === user._id) {
        youOwe -= s.amount;
        (balanceByUser[s.receivedByUserId as string] ??= { owed: 0, owing: 0 }).owed -= s.amount;
      } else {
        youAreOwed -= s.amount;
        (balanceByUser[s.paidByUserId as string] ??= { owed: 0, owing: 0 }).owed -= s.amount;
      }
    }

    const youOweList: { userId: string; name: string; imageUrl?: string; amount: number }[] = [];
    const youAreOwedByList: { userId: string; name: string; imageUrl?: string; amount: number }[] = [];

    for (const [uid, { owed, owing }] of Object.entries(balanceByUser)) {
      const net = owed - owing;
      if (net === 0) continue;

      const counterPart = (await ctx.db.get(uid as Id<"users">)) as (User | null);

      const base = {
        userId: uid,
        name: counterPart?.name ?? "Unknown",
        imageUrl: counterPart?.imageUrl,
        amount: Math.abs(net),
      };

      if (net > 0) youAreOwedByList.push(base);
      else youOweList.push(base);
    }

    youOweList.sort((a, b) => b.amount - a.amount);
    youAreOwedByList.sort((a, b) => b.amount - a.amount);

    return {
      youOwe,
      youAreOwed,
      totalBalance: youAreOwed - youOwe,
      oweDetails: {
        youOwe: youOweList,
        youAreOwedBy: youAreOwedByList,
      },
    };
  },
});

// Getting Total Spending

export const getTotalSpent = query({
  handler: async (ctx): Promise<number> => {
    const user = (await ctx.runQuery(internal.users.getCurrentUser)) as User;

    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1).getTime();

    const expenses = (await ctx.db
      .query("expenses")
      .withIndex("by_date", (q) => q.gte("date", startOfYear))
      .collect()) as Expense[];

    const userExpenses = expenses.filter(
      (e) => e.paidByUserId === user._id || e.splits.some((s) => s.userId === user._id)
    );

    let totalSpent = 0;
    for (const e of userExpenses) {
      const userSplit = e.splits.find((s) => s.userId === user._id);
      if (userSplit) totalSpent += userSplit.amount;
    }

    return totalSpent;
  },
});

// Getting monthly Spending

export const getMonthlySpending = query({
  handler: async (ctx): Promise<{ month: number; total: number }[]> => {
    const user = (await ctx.runQuery(internal.users.getCurrentUser)) as User;

    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1).getTime();

    const allExpenses = (await ctx.db
      .query("expenses")
      .withIndex("by_date", (q) => q.gte("date", startOfYear))
      .collect()) as Expense[];

    const userExpenses = allExpenses.filter(
      (expense) => expense.paidByUserId === user._id || expense.splits.some((split) => split.userId === user._id)
    );

    const monthlyTotals: Record<number, number> = {};
    for (let i = 0; i < 12; i++) {
      const monthStart = new Date(currentYear, i, 1).getTime();
      monthlyTotals[monthStart] = 0;
    }

    for (const expense of userExpenses) {
      const date = new Date(expense.date);
      const monthStart = new Date(date.getFullYear(), date.getMonth(), 1).getTime();
      const userSplit = expense.splits.find((split) => split.userId === user._id);
      if (userSplit) monthlyTotals[monthStart] = (monthlyTotals[monthStart] || 0) + userSplit.amount;
    }

    const result = Object.entries(monthlyTotals).map(([month, total]) => ({
      month: Number(month),
      total,
    }));

    result.sort((a, b) => a.month - b.month);
    return result;
  },
});

// Getting User Groups

export const getUserGroups = query({
  handler: async (ctx): Promise<
    { id: Id<"groups">; name: string; members: { userId: Id<"users"> }[]; balance: number }[]
  > => {
    const user = (await ctx.runQuery(internal.users.getCurrentUser)) as User;

    const allGroups = (await ctx.db.query("groups").collect()) as Group[];
    const groups = allGroups.filter((group) =>
      group.members.some((member) => member.userId === user._id)
    );

    const enhancedGroups = await Promise.all(
      groups.map(async (group) => {
        const expenses = (await ctx.db
          .query("expenses")
          .withIndex("by_group", (q) => q.eq("groupId", group._id))
          .collect()) as Expense[];

        let balance = 0;

        for (const expense of expenses) {
          if (expense.paidByUserId === user._id) {
            for (const split of expense.splits) {
              if (split.userId !== user._id && !split.paid) balance += split.amount;
            }
          } else {
            const mySplit = expense.splits.find((s) => s.userId === user._id);
            if (mySplit && !mySplit.paid) balance -= mySplit.amount;
          }
        }

        const settlementsAll = (await ctx.db.query("settlements").collect()) as Settlement[];
        const settlements = settlementsAll.filter(
          (s) => s.groupId === group._id && (s.paidByUserId === user._id || s.receivedByUserId === user._id)
        );

        for (const settlement of settlements) {
          if (settlement.paidByUserId === user._id) balance += settlement.amount;
          else balance -= settlement.amount;
        }

        return { ...group, id: group._id, balance };
      })
    );

    return enhancedGroups;
  },
});
