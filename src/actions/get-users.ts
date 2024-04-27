import prismadb from "@/lib/prismadb";
import getSession from "./get-session";

const getUsers = async () => {
    const session = await getSession();

    if (!session?.user?.email) {
        return [];
    }

    try {
        const users = await prismadb.user.findMany({
            orderBy: {
                createdAt: "desc"
            },
            where: {
                NOT: {
                    email: session.user.email
                }
            }
        });

        if (!users) {
            return null;
        }

        return users;

    } catch (error: any) {
        return [];
    }
}

export default getUsers;