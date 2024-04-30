"use client";

import { FC, useEffect, useRef, useState } from "react"
import { find } from "lodash";
import axios from "axios";

import { FullMessageType } from "@/types";
import useConversation from "@/hooks/use-conversation";
import MessageBox from "./message-box";
import { pusherClient } from "@/lib/pusher";

interface BodyProps {
    initialMessages: FullMessageType[]
}

const Body: FC<BodyProps> = ({ initialMessages }) => {

    const [messages, setMessages] = useState(initialMessages);

    const bottomRef = useRef<HTMLDivElement>(null);

    const { conversationId } = useConversation();

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`);
    }, [conversationId]);

    useEffect(() => {
        pusherClient.subscribe(conversationId as string);
        bottomRef?.current?.scrollIntoView();

        const messageHandler = (message: FullMessageType) => {
            console.log("NEW MESSAGE")
            setMessages((prev) => {
                if (find(prev, { id: message.id })) prev;

                return [...prev, message];
            });
            bottomRef?.current?.scrollIntoView();
            axios.post(`/api/conversations/${conversationId}/seen`);
        }

        const updateMessageHandler = (newMessage: FullMessageType) => {
            console.log("UPDATE MESSAGE")
            setMessages(prev => prev.map(currentMessage => {
                if (currentMessage.id === newMessage.id) {
                    return newMessage;
                }

                return currentMessage;
            }))
        }

        pusherClient.bind("messages:new", messageHandler);
        pusherClient.bind("message:update", updateMessageHandler);

        return () => {
            pusherClient.unsubscribe(conversationId as string);

            pusherClient.unbind("messages:new", messageHandler);
            pusherClient.unbind("message:update", updateMessageHandler);
        }
    }, [conversationId]);

    return (
        <div className="flex-1 overflow-y-auto scroll scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
            {
                messages.map((message, index) => (
                    <MessageBox
                        key={index}
                        isLast={index === messages.length - 1}
                        data={message}
                    />
                ))
            }

            <div ref={bottomRef} className="pt-24" />
        </div>
    )
}

export default Body;