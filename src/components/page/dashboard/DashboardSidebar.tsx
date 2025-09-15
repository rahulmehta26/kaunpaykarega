import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { IconChevronRight, IconCirclePlus } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import BalanceSummary from './BalanceSummary'
import GroupList from './GroupList'
import type { Balance } from '@/types/balance'
import type { Group } from '@/types/group'

interface DashboardSidebarProps {
    balance?: Balance;
    groups?: Group[]
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ balance, groups }) => {
    return (
        <div
            className=" space-y-6 "
        >

            <Card>

                <CardHeader className=" pb-3 flex items-center justify-between " >

                    <CardTitle className=" text-md font-medium text-muted-foreground " > Balance Details </CardTitle>

                    <Button
                        className=" rounded-full shadow-sm hover:bg-orange-600 cursor-pointer "
                    >
                        <Link to="/contacts"
                            className=" flex items-center justify-center gap-2 "
                        >
                            View all
                            <IconChevronRight className=" size-6 stroke-2 " />
                        </Link>
                    </Button>

                </CardHeader>

                <CardContent>

                    <BalanceSummary
                        balance={balance}
                    />

                </CardContent>
            </Card>

            <Card>

                <CardHeader className=" pb-3 flex items-center justify-between " >

                    <CardTitle className=" text-md font-medium text-muted-foreground " > Your Groups </CardTitle>

                    <Button
                        className=" rounded-full shadow-sm hover:bg-orange-600 cursor-pointer "
                    >
                        <Link to="/contacts"
                            className=" flex items-center justify-center gap-2 "
                        >
                            View all
                            <IconChevronRight className=" size-6 stroke-2 " />
                        </Link>
                    </Button>

                </CardHeader>

                <CardContent>

                    <GroupList
                        groups={groups}
                    />

                </CardContent>

                <CardFooter>

                    <Button
                        variant="outline"
                        className=" w-full cursor-pointer rounded-full "
                    >
                        <Link
                            to="/contacts?createGroup=true"
                            className=" flex justify-center items-center gap-2 "
                        >

                            <IconCirclePlus className=" size-6 stroke-2 " />
                            Create new group
                        </Link>
                    </Button>
                </CardFooter>
            </Card>

        </div>
    )
}

export default DashboardSidebar