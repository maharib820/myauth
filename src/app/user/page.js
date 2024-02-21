"use client"

import { signOut, useSession } from "next-auth/react";

const UserPage = () => {

    // const session = useSession();
    // console.log(session?.data?.user);

    return (
        <div className="p-10">
            <h1>User page</h1>
            <button onClick={async() => await signOut()} className="btn btn-accent mt-3">Logout</button>
        </div>
    );
};

export default UserPage;