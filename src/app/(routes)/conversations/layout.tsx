import { FC } from "react"

import Sidebar from "@/components/sidebar/sidebar";
import ConversationList from "@/components/conversation-list";
import getConversations from "@/actions/get-conversations";

interface ConversationLayoutProps {
    children: React.ReactNode
}

const ConversationLayout: FC<ConversationLayoutProps> = async ({ children }) => {

    const conversations = await getConversations();

    return <Sidebar>
        <div className="h-full">
            <ConversationList initialData={conversations} />
            {children}
        </div>
    </Sidebar>
}

export default ConversationLayout;