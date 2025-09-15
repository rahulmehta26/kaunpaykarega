interface Members {
    joinedAt: number;
    role: "role";
    userId: string
}

export interface Group {
    id: string;
    name: string;
    members: Members[];
    balance: number;
    createdBy: string;
    description: string;
    createdAt: number;

}
