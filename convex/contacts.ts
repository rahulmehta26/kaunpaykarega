import { mutation, query } from './_generated/server';
import { internal } from './_generated/api';
import type { Id } from './_generated/dataModel'; // Import Id type
import { v } from 'convex/values';
// Ensure that internal.users exists and is exported from './_generated/api'

type ContactUser = {
  id: Id<'users'>;
  name: string;
  email: string;
  imageUrl: string | undefined;
  type: 'user';
};

type ContactGroup = {
  id: Id<'groups'>;
  name: string;
  description?: string;
  memberCount: number;
  type: 'group';
};

export const getAllContacts = query({
  handler: async (ctx): Promise<{ users: ContactUser[]; groups: ContactGroup[] }> => {
    const currentUser = await ctx.runQuery(internal.users.getCurrentUser);

    const expensesYouPaid = await ctx.db
      .query('expenses')
      .withIndex('by_user_and_group', (q) =>
        q.eq('paidByUserId', currentUser._id).eq('groupId', undefined)
      )
      .collect();

    const expensesNotYouPaid = (
      await ctx.db
        .query('expenses')
        .withIndex('by_group', (q) => q.eq('groupId', undefined))
        .collect()
    ).filter(
      (e) =>
        e.paidByUserId !== currentUser._id && e.splits.some((s) => s.userId === currentUser._id)
    );

    const personalExpenses = [...expensesYouPaid, ...expensesNotYouPaid];

    const contactIds = new Set();

    personalExpenses.forEach((exp) => {
      if (exp.paidByUserId !== currentUser._id) contactIds.add(exp.paidByUserId);

      exp.splits.forEach((s) => {
        if (s.userId !== currentUser._id) contactIds.add(s.userId);
      });
    });

    const contactUsers = await Promise.all(
      [...contactIds].map(async (id) => {
        // Ensure id is typed as Id<"users">
        const userId = id as Id<'users'>;
        const u = await ctx.db.get(userId);

        return u
          ? {
              id: u._id,
              name: u.name,
              email: u.email,
              imageUrl: u.imageUrl,
              type: 'user',
            }
          : null;
      })
    );

    const userGroups: ContactGroup[] = (await ctx.db.query('groups').collect())
      .filter((g) => g.members.some((m) => m.userId === currentUser._id))
      .map((g) => ({
        id: g._id,
        name: g.name,
        description: g.description,
        memberCount: g.members.length,
        type: 'group',
      }));

    const filteredContactUsers = contactUsers.filter((u): u is ContactUser => u !== null);

    filteredContactUsers.sort((a, b) => a.name.localeCompare(b.name));
    userGroups.sort((a, b) => a.name.localeCompare(b.name));

    return {
      users: filteredContactUsers,
      groups: userGroups,
    };
  },
});

export const createGroup = mutation({
  args: {
    name: v.string(),
    description: v.optional(v.string()),
    members: v.array(v.id('users')),
  },

  handler: async (ctx, args): Promise<Id<'groups'>> => {
    const currentUser = await ctx.runQuery(internal.users.getCurrentUser);

    if (!args.name.trim()) throw new Error(' Group name cannot be empty ');

    const uniqueMembers = new Set(args.members);

    uniqueMembers.add(currentUser._id);

    for (const id of uniqueMembers) {
      if (!(await ctx.db.get(id))) throw new Error(` User with ID ${id} not found`);
    }

    return await ctx.db.insert('groups', {
      name: args.name.trim(),
      description: args.description?.trim() ?? '',
      createdBy: currentUser._id,
      members: [...uniqueMembers].map((id) => ({
        userId: id,
        role: id === currentUser._id ? 'admin' : 'member',
        joinedAt: Date.now(),
      })),
    });
  },
});
