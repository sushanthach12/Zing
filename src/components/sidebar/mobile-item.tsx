"use client"

import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react"

interface MobileItemProps {
    label: string;
    href: string;
    icon: LucideIcon;
    active?: boolean;
    onClick?: () => void;
}

const MobileItem: FC<MobileItemProps> = ({ label, href, icon: Icon, active, onClick }) => {

    const handleClick = () => {
        if (onClick) return onClick();
    }

    return (
        <Link
            href={href}
            onClick={handleClick}
            className={clsx("group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 text-gray-500 hover:text-black hover:bg-gray-100",
                active && "text-black bg-gray-100"
            )}
        >
            <Icon className={clsx("h-6 w-6", active && "text-black")}/>
        </Link>

    )
}

export default MobileItem;