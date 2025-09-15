import type { Id } from "convex/_generated/dataModel";

export interface UserProps {
    _id: Id<"users">;
     name: string;
     email: string;
     tokenIdentifier: string;
     imageUrl?: string;
}

export interface SearchUserResult {
  id: Id<"users">;
  name: string;
  email: string;
  imageUrl?: string;
}