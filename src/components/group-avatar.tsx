"use client";

import { FC } from "react"

import { User } from "@prisma/client";
import Image from "next/image";

interface GroupAvatarProps { 
    users: User[]
}

const GroupAvatar: FC<GroupAvatarProps> = ({ users = [] }) => {

    const sliceUsers = users.slice(0, 3);

    const positionMap = {
        0: 'top-0 left-[12px]',
        1: 'bottom-0',
        2: 'bottom-0 right-0'
    }


    return (
        <div className="relative h-11 w-11">
            {
                sliceUsers.map((user, index) => (
                    <div
                        key={user.id}
                        className={`absolute inline-block overflow-hidden h-[21px] w-[21px] rounded-full ${positionMap[index as keyof typeof positionMap]}`}
                    >
                        <Image
                            src={user.image || "/placeholders.jpg"}
                            alt={"Avatar"}
                            fill
                            className="rounded-full"
                        />
                    </div>
                ))
            }
        </div>
    )
}

export default GroupAvatar;