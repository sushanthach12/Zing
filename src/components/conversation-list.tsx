"use client";

import { FC } from "react"

import { FullConversationType } from "@/types";

interface ConversationListProps { 
    initialData: FullConversationType[]
}

const ConversationList: FC<ConversationListProps> = ({ initialData }) => {

    return <div>ConversationList</div>
}

export default ConversationList;