import getCurrentUser from "@/actions/get-current-user";
import prismadb from "@/lib/prismadb";
import { pusherServer } from "@/lib/pusher";
import { NextResponse } from "next/server"

export const DELETE = async (_req: Request, { params }: { params: { conversationId: string } }) => {
    try {

        const conversationId = params.conversationId;

        const currentUser = await getCurrentUser();

        if (!currentUser?.id) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const existingConversation = await prismadb.conversation.findUnique({
            where: {
                id: conversationId,
            },
            include: {
                users: true
            }
        });

        if (!existingConversation) {
            return new NextResponse("Invalid ID", { status: 404 })
        }

        const deletedConversation = await prismadb.conversation.deleteMany({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currentUser.id]
                }
            }
        });

        existingConversation.users.forEach(user => {
            if (user.email) {
                pusherServer.trigger(user.email, "conversation:delete", existingConversation);
            }
        });

        return NextResponse.json(deletedConversation)

    } catch (error) {
        console.log("ERROR_DELETE", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}