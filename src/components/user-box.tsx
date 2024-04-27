"use client";

import { FC, useCallback, useState } from "react"
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import Avatar from "./avatar";

interface UserBoxProps {
    user: User
}

const UserBox: FC<UserBoxProps> = ({ user }) => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const handleClick = useCallback(async () => {
        try {
            setIsLoading(true);

            const res = await axios.post("/api/conversations", {
                userId: user.id
            });

            router.push(`/conversations/${res.data.id}`)

        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error.response?.data);
            } else {
                toast.error("An error occurred. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }

    }, [user, router]);

    return (
        <div
            onClick={handleClick}
            className="w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer"
        >
            <Avatar user={user} />

            <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                    <div className="flex justify-between items-center mb-1">
                        <p className="text-base font-medium text-gray-900">
                            {user.name}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserBox;