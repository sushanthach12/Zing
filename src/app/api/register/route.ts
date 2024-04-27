import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import CryptoJS from "crypto-js";

export async function POST(req: Request) {
    try {

        const body = await req.json();

        const { name, email, password } = body;

        if (!name || !email || !password) {
            return new NextResponse("Missing required fields", { status: 400 })
        }

        const existingUser = await prismadb.user.findUnique({
            where: {
                email
            }
        });

        if (existingUser) {
            return new NextResponse("User already exists", { status: 409 })
        }

        const hashedPassword = CryptoJS.AES.encrypt(password, process.env.CRYPTO_SECRET as string).toString();

        const user = await prismadb.user.create({
            data: {
                name,
                email,
                hashedPassword,
            }
        });


        return NextResponse.json(user, { status: 201 });

    } catch (error) {
        console.log("REGISTER_ERROR", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}