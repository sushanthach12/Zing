import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/get-current-user";
import prismadb from "@/lib/prismadb";
import { pusherServer } from "@/lib/pusher";

export const POST = async (req: Request) => {
    try {

        const currentUser = await getCurrentUser();

        const body = await req.json();

        const { message, image, conversationId } = body;

        if(!currentUser?.id || !currentUser?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const newMessage = await prismadb.message.create({
            data: {
                body: message,
                image,
                conversation: {
                    connect: {
                        id: conversationId
                    }
                },
                sender: {
                    connect: {
                        id: currentUser.id
                    }
                },
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            },
            include: {
                sender: true,
                seen: true
            }
        });

        const updatedConversation = await prismadb.conversation.update({
            where: {
                id: conversationId
            },
            data: {
                lastMessageAt: new Date(),
                messages: {
                    connect: {
                        id: newMessage.id
                    }
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        seen: true,
                    }
                }
            }
        });

        await pusherServer.trigger(conversationId, "messages:new", newMessage);

        const lastMessage = updatedConversation.messages[updatedConversation.messages.length - 1];

        updatedConversation.users.map(user => {
            pusherServer.trigger(user.email!, "conversation:update", {
                id: conversationId,
                messages: [lastMessage]
            });
        })

        return NextResponse.json(newMessage);
    } catch (error) {
        console.log("ERROR_MESSAGES_POST", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}