"use client"

import { FC } from "react"

import useRoutes from "@/hooks/use-routes";
import useConversation from "@/hooks/use-conversation";
import MobileItem from "./mobile-item";

interface MobileFooterProps { }

const MobileFooter: FC<MobileFooterProps> = ({ }) => {

    const routes = useRoutes();

    const { isOpen } = useConversation();

    if (isOpen) return null;

    return <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden">
        {
            routes.map((item) => (
                <MobileItem
                    key={item.label}
                    label={item.label}
                    href={item.href}
                    icon={item.icon}
                    active={item.active}
                    onClick={item.onClick}
                />
            ))
        }
    </div>
}

export default MobileFooter;