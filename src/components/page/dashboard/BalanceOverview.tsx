import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Balance } from '@/types/balance';

interface TotalBalance {
    totalBalance: number;
    balance?: Balance;
}

const BalanceOverview: React.FC<TotalBalance> = ({ totalBalance, balance }) => {
    return (
        <div
            className=" grid grid-cols-1 md:grid-cols-3 gap-4 "
        >

            <Card>

                <CardHeader className=" pb-2 " >

                    <CardTitle className=" text-md font-medium text-muted-foreground " >Total Balance</CardTitle>

                </CardHeader>

                <CardContent>

                    <div className=" text-2xl font-bold " >
                        {
                            totalBalance > 0 ? (

                                <span
                                    className=" text-green-600 "
                                >
                                    +₹ {totalBalance?.toFixed(2)}
                                </span>

                            ) : totalBalance < 0 ? (
                                <span
                                    className=" text-red-600 "
                                >
                                    -₹ {Math.abs(totalBalance).toFixed(2)}
                                </span>
                            ) : (
                                <span> ₹0.00 </span>
                            )
                        }
                    </div>

                    <p className=" text-xs text-muted-foreground mt-1 " >
                        {
                            totalBalance > 0 ? "You are owed money" : totalBalance < 0 ? "You owe money" : "All settled up!"
                        }
                    </p>

                </CardContent>
            </Card>

            <Card>

                <CardHeader className=" pb-2 " >

                    <CardTitle className=" text-md font-medium text-muted-foreground " >You are owed</CardTitle>

                </CardHeader>

                <CardContent>

                    <div className=" text-2xl font-bold text-green-600 " >
                        ₹ {
                            balance?.youAreOwed?.toFixed(2)
                        }
                    </div>

                    <p className=" text-xs text-muted-foreground mt-1 " >
                        From {
                            balance?.oweDetails?.youAreOwedBy?.length || 0
                        } People
                    </p>

                </CardContent>
            </Card>

            <Card>

                <CardHeader className=" pb-2 " >

                    <CardTitle className=" text-md font-medium text-muted-foreground " >You owe</CardTitle>

                </CardHeader>

                <CardContent>

                    {
                        balance?.oweDetails?.youOwe?.length ?? 0 > 0 ? (
                            <>
                                <div className=" text-2xl font-bold text-red-600 " >
                                    ₹ {
                                        balance?.youOwe?.toFixed(2)
                                    }
                                </div>
                            </>
                        ) : (
                            <>
                                <div className=" text-2xl font-bold " >₹0.00</div>

                                <p
                                    className=" text-xs text-muted-foreground mt-1 "
                                >
                                    You don't owe anyone
                                </p>
                            </>
                        )
                    }

                </CardContent>
            </Card>
        </div>
    )
}

export default BalanceOverview