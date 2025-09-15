import { useConvexQuery } from '@/hooks/useConvexQuery';
import { api } from '../../../../convex/_generated/api';
import { Button } from '../../ui/button';
import { IconPlus, IconUser } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '../../ui/card';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import CreateGroupModal from './CreateGroupModal';

interface UserProps {
    id: string;
    name: string;
    imageUrl: string;
    email: string;
}

interface ContactData {
    users: UserProps[];
    groups: { id: string; name: string; memberCount: number }[];
}

const Contact = () => {

    const { data, isLoading } = useConvexQuery<ContactData>(api.contacts.getAllContacts);

    const [searchParams] = useSearchParams();

    const createGroupParam = searchParams.get("createGroup");

    const [isCreatedGroupModalOpen, setIsCreatedGroupModalOpen] = useState<boolean>(false);

    const router = useNavigate();

    useEffect(() => {

        if (createGroupParam === "true") {
            setIsCreatedGroupModalOpen(true);

            const url = new URL(window.location.href);
            url.searchParams.delete("createGroup")

            router(url.pathname + url.search, { replace: true })
        }
    }, [createGroupParam, router]);

    if (isLoading) {
        return <div>Loading....</div>
    }

    const { users, groups } = data || { users: [], groups: [] }

    return (
        <section className=' wrapper py-8 ' >

            <div
                className=' flex items-center justify-between mb-6 '
            >

                <h1 className=' text-5xl gradient-text ' >Contacts</h1>

                <Button
                    onClick={() => setIsCreatedGroupModalOpen(true)}
                    className=' rounded-full flex items-center text-shadow-sm cursor-pointer shadow-sm hover:bg-orange-600 hover:text-white ' >

                    <IconPlus className='size-6 stroke-3 ' />
                    Create Group
                </Button>
            </div>

            <div
                className=' grid md:grid-cols-2 md:gap-x-5 lg:gap-x-10 '
            >

                <div>
                    <h2
                        className=' text-xl font-bold mb-4 flex items-center gap-x-2 '
                    >

                        <IconUser className=' w-6 h-6 ' />
                        People
                    </h2>

                    {

                        users.length === 0 ?
                            (

                                <Card>

                                    <CardContent
                                        className=' py-6 text-center text-muted-foreground '
                                    >
                                        No contacts yet. Add an expense with someone to see them here.
                                    </CardContent>

                                </Card>
                            )
                            :

                            (
                                <div className=' flex flex-col gap-4 ' >
                                    {
                                        users?.map((user: UserProps) => (

                                            <Link
                                                key={user.id}
                                                to={`/person/${user.id}`}
                                            >

                                                <Card
                                                    className=' hover:bg-muted/30 transition-colors cursor-pointer '
                                                >

                                                    <CardContent
                                                        className=' py-4 '
                                                    >
                                                        <div
                                                            className=' flex items-center justify-between '
                                                        >
                                                            <div
                                                                className=' flex items-center gap-x-4 '
                                                            >

                                                                <Avatar className=' w-10 h-10 ' >

                                                                    <AvatarImage src={user.imageUrl} />
                                                                    <AvatarFallback>
                                                                        {
                                                                            user.name?.charAt(0)
                                                                        }
                                                                    </AvatarFallback>
                                                                </Avatar>

                                                                <div>
                                                                    <p className=' font-medium ' >{user?.name}</p>
                                                                    <p className=' text-sm text-muted-foreground ' >{user?.email}</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </CardContent>

                                                </Card>

                                            </Link>
                                        ))
                                    }
                                </div>
                            )
                    }
                </div>

                <div>
                    <h2
                        className=' text-xl font-bold mb-4 flex items-center gap-x-2 '
                    >

                        <IconUser className=' w-6 h-6 ' />
                        Group
                    </h2>

                    {

                        groups.length === 0 ?
                            (

                                <Card>

                                    <CardContent
                                        className=' py-6 text-center text-muted-foreground '
                                    >
                                        No groups yet. Create a group to start tracking shared expenses.
                                    </CardContent>

                                </Card>
                            )
                            :

                            (
                                <div className=' flex flex-col gap-4 ' >
                                    {
                                        groups?.map((group: any) => (

                                            <Link
                                                key={group.id}
                                                to={`/groups/${group.id}`}
                                            >

                                                <Card
                                                    className=' hover:bg-muted/30 transition-colors cursor-pointer '
                                                >

                                                    <CardContent
                                                        className=' py-4 '
                                                    >
                                                        <div
                                                            className=' flex items-center justify-between '
                                                        >
                                                            <div
                                                                className=' flex items-center gap-x-4 '
                                                            >

                                                                <div className=' bg-primary/10 p-2 rounded-md ' >
                                                                    <IconUser className=' w-6 h-6 ' />
                                                                </div>

                                                                <div>
                                                                    <p className=' font-medium ' >{group?.name}</p>
                                                                    <p className=' text-sm text-muted-foreground ' >{group?.memberCount} members</p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </CardContent>

                                                </Card>

                                            </Link>
                                        ))
                                    }
                                </div>
                            )
                    }
                </div>
            </div>

            <CreateGroupModal
                onClose={() => setIsCreatedGroupModalOpen(false)}
                isOpen={isCreatedGroupModalOpen}
                onSuccess={(groupId) => { router(`/groups/${groupId}`) }}
            />

        </section>
    )
}

export default Contact