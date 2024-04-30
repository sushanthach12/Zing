"use client"

import { FC, useMemo, useState } from "react"

import { Conversation, User } from "@prisma/client";
import useOtherUser from "@/hooks/use-other-user";
import Link from "next/link";
import { ChevronLeft, MoreHorizontal } from "lucide-react";
import Avatar from "./avatar";
import ProfileDrawer from "@/app/(routes)/conversations/[conversationId]/_components/profile-drawer";

interface HeaderProps {
    conversation: Conversation & {
        users: User[]
    }
}

const Header: FC<HeaderProps> = ({ conversation }) => {

    const otherUser = useOtherUser(conversation);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const statusText = useMemo(() => {
        if (conversation.isGroup) return `${conversation.users.length} members`;

        return "Active";
    }, [conversation]);

    return (
        <>
            <ProfileDrawer
                data={conversation}
                isOpen={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            />
            <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
                <div className="flex gap-3 items-center">
                    <Link
                        href={"/conversations"}
                        className="lg:hidden block text-sky-500 hover:text-sky-600 transition cursor-pointer"
                    >
                        <ChevronLeft size={32} />
                    </Link>

                    <Avatar user={otherUser} />

                    <div className="flex flex-col font-medium">
                        <div>
                            {
                                conversation.name || otherUser.name
                            }
                        </div>
                        <div className="text-sm font-medium text-neutral-500">
                            {statusText}
                        </div>
                    </div>
                </div>
                <MoreHorizontal
                    size={32}
                    onClick={() => setDrawerOpen(true)}
                    className="text-sky-500 cursor-pointer hover:text-sky-600 transition"
                />
            </div>
        </>

    )
}

export default Header;