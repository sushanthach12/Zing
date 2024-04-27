"use client"

import Button from "@/components/ui/button";
import { signOut } from "next-auth/react";

const UsersPage = () => {

    return <div>
        <Button onClick={() => signOut()}>Log out</Button>
    </div>
}

export default UsersPage;