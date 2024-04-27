"use client";

import clsx from "clsx";

import useConversation from "@/hooks/use-conversation";
import EmptyState from "@/components/empty-state";

const ConversationsPage = () => {
    const { isOpen } = useConversation();

    return (
        <div
            className={clsx("lg:pl-80 h-full lg:block", isOpen? "block" : "hidden")}
        >
            <EmptyState />
        </div>
    )
};

export default ConversationsPage;