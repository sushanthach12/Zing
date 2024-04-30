import { FC } from "react"

import Sidebar from "@/components/sidebar/sidebar";
import ConversationList from "@/components/conversation-list";
import getConversations from "@/actions/get-conversations";
import getUsers from "@/actions/get-users";

interface ConversationLayoutProps {
    children: React.ReactNode
}

const ConversationLayout: FC<ConversationLayoutProps> = async ({ children }) => {

    const conversations = await getConversations();
    const users = await getUsers();

    return <Sidebar>
        <div className="h-full">
            <ConversationList
                initialData={conversations}
                users={users!}
            />
            {children}
        </div>
    </Sidebar>
}

export default ConversationLayout;