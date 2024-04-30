import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import getCurrentUser from "@/actions/get-current-user";

export async function POST(req: Request) {
    try {

        const currentUser = await getCurrentUser();

        const body = await req.json();

        const { name, image } = body;

        if(!currentUser?.id) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        if (!name || !image) {
            return new NextResponse("Missing required fields", { status: 400 })
        }

        const updatedUser = await prismadb.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                name,
                image
            }
        });

        return NextResponse.json(updatedUser);

    } catch (error) {
        console.log("SETTINGS_ERROR", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}