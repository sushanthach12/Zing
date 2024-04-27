import prismadb from "@/lib/prismadb";
import getSession from "./get-session";

const getCurrentUser = async () => {
    try {

        const session = await getSession();

        if (!session?.user?.email) {
            return null;
        }

        const user = await prismadb.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });

        if (!user) {
            return null;
        }

        return user;
        
    } catch (error: any) {
        return null;
    }
}

export default getCurrentUser;