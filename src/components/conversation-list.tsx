"use client";

import { FC, useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation";
import clsx from "clsx";

import { FullConversationType } from "@/types";
import useConversation from "@/hooks/use-conversation";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./conversation-box";
import GroupChatModal from "./modals/group-chat-modal";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/lib/pusher";

interface ConversationListProps {
    initialData: FullConversationType[]
    users: User[]
}

const ConversationList: FC<ConversationListProps> = ({ initialData, users }) => {

    const { data: session } = useSession();

    const [data, setData] = useState(initialData);
    const [isModalOpen, setIsModalOpen] = useState(false)

    const router = useRouter();

    const { conversationId, isOpen } = useConversation();

    const pusherKey = useMemo(() => {
        return session?.user?.email;
    }, [session?.user?.email]);

    useEffect(() => {
        if (!pusherKey) return;

        pusherClient.subscribe(pusherKey);

        const handleNewConversation = (conversation: FullConversationType) => {
            setData((prev) => {
                if (prev.find((c) => c.id === conversation.id)) return prev;

                return [conversation, ...prev];
            });
        }

        const handleUpdateConversation = (conversation: FullConversationType) => {
            setData((prev) => prev.map((c) => {
                if (c.id === conversation.id) {
                    return {
                        ...c,
                        messages: conversation.messages,
                    };
                }

                return c;
            }))
        }

        const handleDeleteConversation = (conversation: FullConversationType) => {
            setData((prev) => prev.filter((c) => c.id !== conversation.id));

            if(conversationId === conversation.id) router.replace("/conversations");
        }

        pusherClient.bind("conversation:new", handleNewConversation);
        pusherClient.bind("conversation:update", handleUpdateConversation);
        pusherClient.bind("conversation:delete", handleDeleteConversation);

        return () => {
            pusherClient.unsubscribe(pusherKey);

            pusherClient.unbind("conversation:new", handleNewConversation);
            pusherClient.unbind("conversation:update", handleUpdateConversation);
            pusherClient.unbind("conversation:delete", handleDeleteConversation);
        }
    }, [pusherKey, conversationId, router]);

    return (
        <>
            <GroupChatModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                users={users}
            />
            <aside className={clsx("fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200",
                isOpen ? "hidden" : "block w-full left-0"
            )}>
                <div className="px-5">
                    <div className="flex justify-between mb-4 pt-4">
                        <div className="text-2xl font-bold text-neutral-800">
                            Messages
                        </div>

                        <div className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition">
                            <MdOutlineGroupAdd size={20} onClick={() => setIsModalOpen(true)} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        {
                            data.map((conversation) => (
                                <ConversationBox
                                    key={conversation.id}
                                    conversation={conversation}
                                    selected={conversationId === conversation.id}
                                />
                            ))
                        }
                    </div>
                </div>
            </aside>
        </>
    )
}

export default ConversationList;