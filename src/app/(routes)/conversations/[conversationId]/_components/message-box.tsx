"use client";

import { FC } from "react"

import { FullMessageType } from "@/types";
import { useSession } from "next-auth/react";
import clsx from "clsx";
import Avatar from "@/components/avatar";
import { format } from "date-fns";
import Image from "next/image";

interface MessageBoxProps {
    isLast?: boolean;
    data: FullMessageType;
}

const MessageBox: FC<MessageBoxProps> = ({ isLast, data }) => {

    const { data: session } = useSession();

    const isOwnMessage = session?.user?.email === data.sender.email;

    const seenList = (data.seen || [])
        .filter(user => user.email !== session?.user?.email)
        .map(user => user.name)
        .join(', ');


    const container = clsx("flex gap-3 p-4", isOwnMessage && "justify-end");

    const avatar = clsx(isOwnMessage && "order-2");

    const body = clsx("flex flex-col gap-2", isOwnMessage && "items-end");

    const message = clsx("text-sm w-fit overflow-hidden",
        isOwnMessage ? "bg-sky-500 text-white" : "bg-gray-100",
        data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
    );

    return (
        <div className={container}>
            <div className={avatar}>
                <Avatar user={data.sender} />
            </div>

            <div className={body}>
                <div className="flex items-center gap-1">
                    <div className="text-sm text-gray-500 font-medium">
                        {data.sender.name}
                    </div>

                    <div className="text-xs text-gray-400">
                        {format(new Date(data.createdAt), 'p')}
                    </div>
                </div>

                <div className={message}>
                    {
                        data.image ? (
                            <Image
                                src={data.image}
                                alt="message-image"
                                width={288}
                                height={288}
                                className="object-cover hover:scale-110 transition translate cursor-pointer"
                            />
                        ) : (
                            data.body
                        )
                    }
                </div>
                {
                    isLast && isOwnMessage && seenList.length > 0 && (
                        <div className="text-xs font-medium text-gray-500">
                            {`Seen by ${seenList}`}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default MessageBox;