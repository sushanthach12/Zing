import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import useConversation from "./use-conversation";
import { LogOut, MessageCircle, Users } from "lucide-react";

const useRoutes = () => {
    const pathname = usePathname();

    const { conversationId } = useConversation();

    const routes = useMemo(() => [
        {
            label: 'Chat',
            href: '/conversations',
            icon: MessageCircle,
            active: pathname === '/conversations' || !!conversationId,
        },
        {
            label: 'Users',
            href: '/users',
            icon: Users,
            active: pathname === '/users',
        },
        {
            label: 'Logout',
            href: '#',
            onClick: () => signOut(),
            icon: LogOut,
            active: false,
        }
    ], [pathname, conversationId]);

    return routes;
}

export default useRoutes;