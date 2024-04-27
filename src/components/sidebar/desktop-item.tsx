"use client"

import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react"

interface DesktopItemProps {
    label: string;
    href: string;
    icon: LucideIcon;
    active?: boolean;
    onClick?: () => void;
}

const DesktopItem: FC<DesktopItemProps> = ({ label, href, icon: Icon, active, onClick }) => {

    const handleClick = () => {
        if (onClick) return onClick();
    }

    return (
        <li onClick={handleClick}>
            <Link
                href={href}
                className={clsx("group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100",
                    active && "text-black bg-gray-100"
                )}
            >
                <Icon className={clsx("h-6 w-6 shrink-0", active && "text-black")} />
                <span className="sr-only">{label}</span>
            </Link>
        </li>
    )
}

export default DesktopItem;