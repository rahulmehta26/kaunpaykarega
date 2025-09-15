import type React from "react";
import { IconCircleArrowDown, IconCircleArrowUp } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { UserDetail } from "@/types/balance";

interface Balance {
    youOwe: number;
    youAreOwed: number;
    totalBalance: number;
    oweDetails: {
        youOwe: UserDetail[];
        youAreOwedBy: UserDetail[];
    }
}

interface BalanceProps {
    balance?: Balance;
}

const BalanceSummary: React.FC<BalanceProps> = ({ balance }) => {

    if (!balance) return null;

    const { oweDetails } = balance;

    const hasOwed = oweDetails.youAreOwedBy.length > 0;
    const hasOwing = oweDetails.youOwe.length > 0;

    return (
        <div className=" space-y-4 " >
            {
                !hasOwed && !hasOwing && (

                    <div className=" text-center py-6 " >
                        <p className=" text-muted-foreground " >You're all settled up!</p>
                    </div>
                )
            }

            {
                hasOwed && (
                    <div>
                        <h3 className=" text-sm font-medium flex gap-2 items-center mb-3 " >
                            <IconCircleArrowUp className=" size-5 stroke-2 text-orange-primary " />
                            Owed to you
                        </h3>

                        <div >
                            {
                                oweDetails?.youAreOwedBy?.map((item) => (
                                    <Link
                                        key={item?.userId}
                                        to={`/person/${item.userId}`}
                                        className=" flex items-center justify-between hover:bg-muted p-2 rounded-md transition-colors duration-200 "
                                    >
                                        <div
                                            className=" flex items-center gap-2 "
                                        >

                                            <Avatar className=" h-8 w-8 " >

                                                <AvatarImage src={item?.imageUrl} />
                                                <AvatarFallback>{item?.name?.charAt(0)}</AvatarFallback>
                                            </Avatar>

                                            <span className=" text-sm " >{item?.name}</span>
                                        </div>

                                        <span>
                                            ₹ {item?.amount?.toFixed(2)}
                                        </span>

                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                )
            }

            {
                hasOwing && (
                    <div>
                        <h3 className=" text-sm font-medium flex items-center gap-2 mb-3 " >
                            <IconCircleArrowDown className=" size-5 stroke-2 text-red-500 " />
                            You owe
                        </h3>

                        <div >
                            {
                                oweDetails?.youOwe?.map((item) => (
                                    <Link
                                        key={item?.userId}
                                        to={`/person/${item.userId}`}
                                        className=" flex items-center justify-between hover:bg-muted p-2 rounded-md transition-colors duration-200 "
                                    >
                                        <div
                                            className=" flex items-center gap-2 "
                                        >

                                            <Avatar className=" h-8 w-8 " >

                                                <AvatarImage src={item?.imageUrl} />
                                                <AvatarFallback>{item?.name?.charAt(0)}</AvatarFallback>
                                            </Avatar>

                                            <span className=" text-sm " >{item?.name}</span>
                                        </div>

                                        <span className=" text-red-600 font-medium text-sm " >
                                            ₹ {item?.amount?.toFixed(2)}
                                        </span>

                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default BalanceSummary