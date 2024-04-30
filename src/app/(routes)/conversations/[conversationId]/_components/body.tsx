"use client";

import { FC, useEffect, useRef, useState } from "react"

import { FullMessageType } from "@/types";
import useConversation from "@/hooks/use-conversation";
import MessageBox from "./message-box";
import axios from "axios";

interface BodyProps {
    initialMessages: FullMessageType[]
}

const Body: FC<BodyProps> = ({ initialMessages }) => {

    const [messages, setMessages] = useState(initialMessages);

    const bottomRef = useRef<HTMLDivElement>(null);

    const { conversationId } = useConversation();

    useEffect(() => {
        console.log("Body", conversationId)
        axios.post(`/api/conversations/${conversationId}/seen`, {});
    }, [conversationId])

    return (
        <div className="flex-1 overflow-y-auto">
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