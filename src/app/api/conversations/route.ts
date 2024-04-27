import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/get-current-user";
import prismadb from "@/lib/prismadb";

export const POST = async (req: Request) => {
    try {

        const currentUser = await getCurrentUser();

        const body = await req.json();

        const { userId, isGroup, members, name } = body;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse("UNAUTHORIZED", { status: 401 });
        }

        if (isGroup && (!members || members.length < 2 || !name)) {
            return new NextResponse("INVALID_DATA", { status: 400 });
        }

        // For Group Conversations

        if (isGroup) {
            const newConversation = await prismadb.conversation.create({
                data: {
                    name,
                    isGroup,
                    users: {
                        connect: [
                            ...members.map((member: { value: string }) => ({
                                id: member.value
                            })),
                            {
                                id: currentUser.id
                            }
                        ]
                    }
                },
                include: {
                    users: true
                }
            });

            return NextResponse.json(newConversation);
        }

        // For Direct Conversations

        const isConversationExists = await prismadb.conversation.findMany({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [currentUser.id, userId]
                        }
                    },
                    {
                        userIds: {
                            equals: [userId, currentUser.id]
                        }
                    }
                ]
            }
        });

        // If conversation already exists, return it

        const singleConversation = isConversationExists[0];

        if (singleConversation) {
            return NextResponse.json(singleConversation);
        }

        // Otherwise, create a new conversation

        const newConversation = await prismadb.conversation.create({
            data: {
                users: {
                    connect: [
                        {
                            id: currentUser.id
                        },
                        {
                            id: userId
                        }
                    ]
                }
            },
            include: {
                users: true
            }
        });

        return NextResponse.json(newConversation);

    } catch (error) {
        return new NextResponse("INTERNAL_SERVER_ERROR", { status: 500 });
    }
}