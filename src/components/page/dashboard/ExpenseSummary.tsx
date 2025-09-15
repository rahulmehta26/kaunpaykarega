import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { months } from "@/content/monthNames";
import type React from "react";
import { Bar, BarChart, CartesianGrid, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface monthlySpendingProps {
    month: number;
    total: number
}

interface ExpenseSummary {
    monthlySpending?: monthlySpendingProps[];
    totalSpending?: number;
}

const ExpenseSummary: React.FC<ExpenseSummary> = ({ monthlySpending, totalSpending }) => {


    const chartData = monthlySpending?.map((item) => {

        const date = new Date(item?.month);

        return {
            name: months[date.getMonth()],
            amount: item?.total,
        }
    }) || [];

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return (
        <Card>

            <CardHeader className=" pb-3 flex items-center justify-between " >

                <CardTitle className=" text-md font-medium text-muted-foreground " > Expense Summary </CardTitle>

                <div className=" grid grid-cols-2 gap-4 " >

                    <div className=" bg-muted rounded-lg p-4 " >
                        <p className=" text-sm text-muted-foreground " >Total this month</p>
                        <h3 className=" text-2xl font-bold mt-1 " >
                            ₹ {
                                monthlySpending?.[currentMonth]?.total?.toFixed(2) || "0.00"
                            }
                        </h3>
                    </div>

                    <div className=" bg-muted rounded-lg p-4 " >
                        <p className=" text-sm text-muted-foreground " >Total this year</p>
                        <h3 className=" text-2xl font-bold mt-1 " >
                            ₹  {
                                totalSpending?.toFixed(2) || "0.00"
                            }
                        </h3>
                    </div>
                </div>

            </CardHeader>

            <CardContent>

                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={chartData}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip
                            formatter={(value: number) => [`₹${value?.toFixed(2)}`, "Amount"]}
                            labelFormatter={() => "Spending"}
                        />
                        <Bar dataKey="amount" fill="var(--color-primary)" activeBar={<Rectangle fill="var(--color-orange-100)" stroke="var(--color-orange-500)" />} />
                    </BarChart>
                </ResponsiveContainer>

                <p className="text-xs text-muted-foreground text-center font-medium mt-2">
                    Monthly spending for {currentYear}
                </p>
            </CardContent>
        </Card>
    )
}

export default ExpenseSummary