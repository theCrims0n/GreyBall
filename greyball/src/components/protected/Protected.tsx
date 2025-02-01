'use client'

import { useSession } from "next-auth/react";
import { Spinner } from "../ui/spinner/Spinner";

interface Props {
    children: React.ReactNode;
}

export const Protected = ({ children }: Props) => {

    const { data: session } = useSession();
    const isAuthenticated = !!session?.user;

    return (
        <>
            {!isAuthenticated ? <div className="flex min-h-screen justify-center items-center"><Spinner size={50} /></div> : children}
        </>
    )
}