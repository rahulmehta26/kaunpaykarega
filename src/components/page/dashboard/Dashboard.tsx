import { useConvexQuery } from "@/hooks/useConvexQuery"
import { api } from "../../../../convex/_generated/api"
import { Button } from "@/components/ui/button";
import { IconCirclePlus } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import ExpenseSummary from "./ExpenseSummary";
import type { Group } from "@/types/group";
import BalanceOverview from "./BalanceOverview";
import type { Balance } from "@/types/balance";
import DashboardSidebar from "./DashboardSidebar";

interface monthlySpendingProps {
    month: number;
    total: number
}

const Dashboard = () => {

    const { data: balance, isLoading: balanceLoading } = useConvexQuery<Balance>(api.dashboard.getUserBalance);

    const { data: groups, isLoading: groupsLoading } = useConvexQuery<Group[]>(api.dashboard.getUserGroups);

    const { data: totalSpent, isLoading: totalSpentLoading } = useConvexQuery<number>(api.dashboard.getTotalSpent);

    const { data: monthlySpending, isLoading: monthlySpendingLoading } = useConvexQuery<monthlySpendingProps[]>(api.dashboard.getMonthlySpending);

    const isLoading = balanceLoading || groupsLoading || totalSpentLoading || monthlySpendingLoading;

    const totalBalance = balance?.totalBalance ?? 0;

    if (isLoading) {
        return <div className=" text-4xl font-medium text-primary " >Loading...</div>
    }


    return (
        <section
            className=" wrapper py-8 space-y-6 "
        >

            <div
                className=" flex items-center justify-between "
            >
                <h1 className=" text-5xl gradient-text " >Dashboard</h1>

                <Button
                    className=" rounded-full flex items-center text-shadow-sm cursor-pointer shadow-sm hover:bg-orange-600 "
                    asChild
                >

                    <Link to={"/expenses/new"} >

                        <IconCirclePlus className=" size-6 stroke-2 " />

                        Add Expense
                    </Link>

                </Button>

            </div>

            <BalanceOverview balance={balance} totalBalance={totalBalance} />

            <div
                className=" grid grid-cols-1 lg:grid-cols-3 gap-6 "
            >

                <div
                    className=" lg:col-span-2 space-y-6 "
                >

                    <ExpenseSummary
                        monthlySpending={monthlySpending}
                        totalSpending={totalSpent}
                    />
                </div>

                <DashboardSidebar balance={balance} groups={groups} />

            </div>

        </section>
    )
}

export default Dashboard