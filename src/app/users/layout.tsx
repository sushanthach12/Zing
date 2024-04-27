import { FC } from "react"

import getUsers from "@/actions/get-users";
import Sidebar from "@/components/sidebar/sidebar";
import UserList from "@/components/user-list";

interface UsersLayoutProps {
    children: React.ReactNode
}

const UsersLayout: FC<UsersLayoutProps> = async ({ children }) => {

    const users = await getUsers();

    return <Sidebar>
        <div className="h-full">
            <UserList users={users!} />
            {children}
        </div>
    </Sidebar>
}

export default UsersLayout;