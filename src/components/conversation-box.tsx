"use client"

import { FC, useCallback, useMemo } from "react"
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";

import { FullConversationType } from "@/types";
import { Conversation, User, Message } from "@prisma/client";
import useOtherUser from "@/hooks/use-other-user";
import Avatar from "./avatar";

interface ConversationBoxProps {
    conversation: FullConversationType;
    selected?: boolean;
}

const ConversationBox: FC<ConversationBoxProps> = ({ conversation, selected }) => {

    const { data: session } = useSession();

    const router = useRouter();

    const otherUser = useOtherUser(conversation);

    const handleClick = useCallback(() => {
        router.push(`/conversations/${conversation.id}`);
    }, [conversation.id, router]);


    const lastMessage = useMemo(() => {
        const messages = conversation.messages;

        return messages[messages.length - 1];
    }, [conversation.messages]);


    const userEmail = useMemo(() => {
        if (!session?.user?.email) return null;

        return session.user.email;
    }, [session?.user?.email]);


    const hasSeen = useMemo(() => {
        if (!lastMessage) return false;

        const seenArray = lastMessage.seen || [];

        if(!userEmail) return false;

        return seenArray.filter(user => user.email === userEmail).length !== 0;
    }, [userEmail, lastMessage]);

    const lastMessageText = useMemo(() => {
        if (!lastMessage) return "Started a conversation";

        if(lastMessage.image) return "Sent an image";

        if(lastMessage.body) return lastMessage.body;
    }, [lastMessage]);


    return (
        <div
            onClick={handleClick}
            className={clsx("w-full relative flex items-center space-x-3 hover:bg-neutral-100 rounded-lg cursor-pointer transition p-3", 
                selected ? "bg-neutral-100" : "bg-white"
            )}
        >
            <Avatar user={otherUser} />

            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-base font-medium text-gray-900">
                            {
                                conversation.name || otherUser.name
                            }
                        </p>
                        {
                            lastMessage?.createdAt && (
                                <p className="text-xs text-gray-500 font-medium">
                                    {
                                        format(new Date(lastMessage.createdAt), "p")
                                    }
                                </p>
                            )
                        }
                    </div>
                    <p className={clsx("truncate text-sm",
                        hasSeen? "text-gray-500": "text-black font-medium"
                    )}>
                        {
                            lastMessageText
                        }
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ConversationBox;