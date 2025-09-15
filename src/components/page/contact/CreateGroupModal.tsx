import type React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../../ui/dialog"
import FormInput from "../../ui/common/FormInput";
import { useForm } from "@tanstack/react-form";
import { z } from "zod"
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { useConvexMutation, useConvexQuery } from "@/hooks/useConvexQuery";
import { api } from "../../../../convex/_generated/api";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { IconUsersPlus, IconX } from "@tabler/icons-react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../../ui/command";
import { toast } from "sonner";

interface CreateGroupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (msg: string) => void;
}

const groupSchema = z.object({
    name: z.string().min(1, "Group name is required"),
    description: z.string(),
})

interface User {
    id: number;
    name: string;
    email?: string;
    imageUrl?: string;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ isOpen, onClose, onSuccess }) => {

    const [selectedMembers, setSelectedMembers] = useState<User[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [commandOpen, setCommandOpen] = useState<boolean>(false)

    const { data: currentUser } = useConvexQuery<User>(api.users.getCurrentUser);
    const { data: searchResults, isLoading: isSearching } = useConvexQuery<User[]>(api.users.searchUsers, {
        query: searchQuery
    });

    const createGroup = useConvexMutation<{ name: string; description: string; members: number[] }, string>(api.contacts.createGroup)


    const form = useForm({
        defaultValues: { name: "", description: "" },
        validators: {
            onChange: groupSchema,
        },
        onSubmit: async ({ value }) => {
            try {

                const memberIds = selectedMembers?.map((member) => member.id);

                const groupId = await createGroup.mutate({
                    name: value.name,
                    description: value.description,
                    members: memberIds
                })

                toast.success("Group created successfully")

                form.reset();

                setSelectedMembers([]);

                if (onSuccess) onSuccess(groupId);
                handleClose();

            } catch (error: any) {
                toast.error("Failed to create group" + error?.message);
            }
        },
    })

    const handleClose = () => onClose();

    const addMember = (user: User) => {

        if (!selectedMembers.some((m) => m.id === user.id)) {
            setSelectedMembers([...selectedMembers, user]);
        }

        setCommandOpen(false);
    }

    const removeMember = (userId: number) => {

        setSelectedMembers(
            selectedMembers.filter((m) => m.id !== userId)
        )
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose} >
            <DialogContent>
                <DialogHeader>

                    <DialogTitle>Create New Group</DialogTitle>

                </DialogHeader>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        form.handleSubmit();
                    }}
                    className=" space-y-6 "
                >

                    <form.Field
                        name="name"
                        children={(field) => (
                            <FormInput
                                field={field}
                                label="Group Name"
                                placeholder="Group name"
                            />
                        )}
                    />

                    <form.Field
                        name="description"
                        children={(field) => (
                            <FormInput
                                field={field}
                                label="Description"
                                placeholder="Optional"
                            />
                        )}
                    />

                    <div className=" space-y-2 " >
                        <Label>Members</Label>
                        <div
                            className=" flex items-center flex-wrap gap-2 mb-2 "
                        >
                            {
                                currentUser && (
                                    <Badge
                                        variant="secondary"
                                        className=" px-3 py-2 space-x-1 "
                                    >
                                        <Avatar className=" h-6 w-6 " >

                                            <AvatarImage src={currentUser?.imageUrl} />

                                            <AvatarFallback>
                                                {
                                                    currentUser?.name?.charAt(0) || "?"
                                                }
                                            </AvatarFallback>
                                        </Avatar>

                                        <span className=" text-neutral-600 text-sm  " >{currentUser?.name} (You) </span>
                                    </Badge>
                                )
                            }

                            {/* Selected members */}

                            {
                                selectedMembers?.map((member) => (
                                    <Badge
                                        key={member?.id}
                                        variant="secondary"
                                        className=" px-3 py-2 space-x-1 "
                                    >
                                        <Avatar className=" h-6 w-6 " >

                                            <AvatarImage src={member?.imageUrl} />

                                            <AvatarFallback>
                                                {
                                                    member?.name?.charAt(0) || "?"
                                                }
                                            </AvatarFallback>
                                        </Avatar>

                                        <span className=" text-neutral-600 text-sm  " >{member?.name}</span>

                                        <button
                                            onClick={() => removeMember(member?.id)}
                                            className=" ml-2 text-muted-foreground cursor-pointer hover:text-foreground hover:bg-neutral-300 hover:w-6 hover:h-6 p-1 hover:rounded-full "
                                        >
                                            <IconX className=" h-4 w-4 text-neutral-800" stroke={3} />
                                        </button>
                                    </Badge>
                                ))
                            }

                            <Popover
                                open={commandOpen}
                                onOpenChange={setCommandOpen}
                            >

                                <PopoverTrigger asChild >
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className=' rounded-full flex items-center border-orange-100 text-shadow-2sm cursor-pointer shadow-sm '
                                    >

                                        <IconUsersPlus className=' w-6 h-6 ' />
                                        Add Member
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent
                                    className=" p-0 "
                                    align="start"
                                    side="bottom"
                                >

                                    <Command>

                                        <CommandInput
                                            placeholder="Search by name or email..."
                                            value={searchQuery}
                                            onValueChange={setSearchQuery}
                                        />

                                        <CommandList>

                                            <CommandEmpty>
                                                {
                                                    searchQuery.length < 2 ? (
                                                        <p
                                                            className=" py-3 px-4 text-sm text-center text-muted-foreground "
                                                        >
                                                            Type at least 2 characters to search
                                                        </p>
                                                    ) : isSearching ? (
                                                        <p className=" py-3 px-4 text-sm text-center text-muted-foreground " >Searching...</p>
                                                    ) : (
                                                        <p className=" py-3 px-4 text-sm text-center text-muted-foreground "  >
                                                            No users found
                                                        </p>
                                                    )
                                                }
                                            </CommandEmpty>

                                            <CommandGroup heading="Users" >

                                                {
                                                    searchResults?.map((user) => (

                                                        <CommandItem
                                                            key={user?.id}
                                                            value={user?.name + user?.email}
                                                            onSelect={() => addMember(user)}
                                                        >
                                                            <div className=" flex items-center gap-2 cursor-pointer " >
                                                                <Avatar className=" h-6 w-6 " >

                                                                    <AvatarImage src={user?.imageUrl} />

                                                                    <AvatarFallback>
                                                                        {
                                                                            user?.name?.charAt(0) || "?"
                                                                        }
                                                                    </AvatarFallback>
                                                                </Avatar>

                                                                <div
                                                                    className=" flex flex-col "
                                                                >
                                                                    <span
                                                                        className=" text-sm "
                                                                    >
                                                                        {user?.name}
                                                                    </span>

                                                                    <span
                                                                        className=" text-xs text-muted-foreground "
                                                                    >
                                                                        {user?.email}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </CommandItem>
                                                    ))
                                                }

                                            </CommandGroup>

                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>


                        </div>

                        {
                            selectedMembers.length === 0 && (
                                <p className="text-error-red text-xs font-medium">
                                    Add at least one other person to the group
                                </p>
                            )
                        }
                    </div>

                    <DialogFooter>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            className=" rounded-full hover:bg-orange-50 border-orange-100 cursor-pointer "
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={createGroup.isLoading}
                            className=" rounded-full cursor-pointer hover:bg-orange-600 " >
                            {createGroup.isLoading ? "Creating..." : "Create group"}
                        </Button>
                    </DialogFooter>

                </form>


            </DialogContent>
        </Dialog>
    )
}

export default CreateGroupModal