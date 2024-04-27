import prismadb from "@/lib/prismadb";
import getCurrentUser from "./get-current-user";

const getConversations = async () => {
    try {
        const currentUser = await getCurrentUser();

        if (!currentUser?.id || !currentUser?.email) {
            return [];
        }
        const conversations = await prismadb.conversation.findMany({
            orderBy: {
                lastMessageAt: "desc"
            },
            where: {
                userIds: {
                    has: currentUser.id
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true,
                        seen: true
                    }
                }
            }
        });

        return conversations;
    } catch (error) {
        return []
    }
};

export default getConversations;