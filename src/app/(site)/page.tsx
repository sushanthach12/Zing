import Image from "next/image";
import AuthForm from "./_components/auth-form";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { RedirectType, redirect } from "next/navigation";

const Home = async () => {
    const session = await getServerSession(authOptions);

    if(session) {
        redirect("/users", RedirectType.replace);
    }

    return (
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Image
                    alt="Logo"
                    height={48}
                    width={48}
                    className="mx-auto w-auto"
                    src={"/images/logo.png"}
                />

                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <AuthForm />
        </div>
    );
}

export default Home;
