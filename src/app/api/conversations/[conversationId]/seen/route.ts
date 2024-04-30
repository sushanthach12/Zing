import { NextResponse } from "next/server"

import getCurrentUser from "@/actions/get-current-user";
import prismadb from "@/lib/prismadb";

export const POST = async (req: Request, { params }: { params: { conversationId: string } }) => {
    try {
        
        const currentUser = await getCurrentUser();

        if(!currentUser?.id || !currentUser?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const conversationId = params.conversationId;

        // Find the Existing Conversation

        const conversation = await prismadb.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                messages: {
                    include: {
                        seen: true
                    }
                },
                users: true
            }
        });

        if(!conversation) {
            return new NextResponse("Invalid ID", { status: 400 });
        }

        // Find the last message
        const lastMessage = conversation.messages[conversation.messages.length - 1];

        if(!lastMessage) {
            return NextResponse.json(conversation);
        }

        // Update the seen list

        const updatedMessage = await prismadb.message.update({
            where: {
                id: lastMessage.id
            },
            include: {
                seen: true,
                sender: true
            },
            data: {
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            }
        });

        return NextResponse.json(updatedMessage);

    } catch (error) {
        console.log("ERROR_SEEN", error)
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}