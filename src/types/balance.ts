export interface UserDetail {
    userId: string;
    name: string;
    imageUrl?: string;
    amount: number;
}

export interface Balance {
    youOwe: number;
    youAreOwed: number;
    totalBalance: number;
    oweDetails: {
        youOwe: UserDetail[];
        youAreOwedBy: UserDetail[];
    }
}