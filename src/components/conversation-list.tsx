"use client";

import { FC, useState } from "react"
import { useRouter } from "next/navigation";
import clsx from "clsx";

import { FullConversationType } from "@/types";
import useConversation from "@/hooks/use-conversation";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./conversation-box";
import GroupChatModal from "./modals/group-chat-modal";
import { User } from "@prisma/client";

interface ConversationListProps {
    initialData: FullConversationType[]
    users: User[]
}

const ConversationList: FC<ConversationListProps> = ({ initialData, users }) => {

    const [data, setData] = useState(initialData);
    const [isModalOpen, setIsModalOpen] = useState(false)

    const router = useRouter();

    const { conversationId, isOpen } = useConversation();

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