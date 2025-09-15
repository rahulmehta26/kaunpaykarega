import { useUser } from '@clerk/clerk-react';
import { useConvexAuth, useMutation } from 'convex/react';
import { useEffect, useState } from 'react';
import { api } from '../../convex/_generated/api';
import type { Id } from '../../convex/_generated/dataModel';

export function useStoreUser() {
  const { isLoading: convexLoading, isAuthenticated: convexAuthenticated } = useConvexAuth();
  const { isLoaded: clerkLoaded, user } = useUser();

  const [userId, setUserId] = useState<Id<'users'> | null>(null);
  const storeUser = useMutation(api.users.store);

  useEffect(() => {
    // Wait until Clerk is loaded & Convex has finished checking auth
    if (!clerkLoaded || convexLoading) return;

    // Only run if Convex knows user is authenticated and Clerk has a user object
    if (!convexAuthenticated || !user) return;

    const createUser = async () => {
      try {
        const id = await storeUser();
        setUserId(id);
      } catch (err) {
        console.error('Failed to store user:', err);
      }
    };

    createUser();
    return () => setUserId(null);
  }, [clerkLoaded, convexLoading, convexAuthenticated, user?.id, storeUser]);

  return {
    isLoading: convexLoading || !clerkLoaded || (convexAuthenticated && userId === null),
    isAuthenticated: convexAuthenticated && userId !== null,
  };
}
