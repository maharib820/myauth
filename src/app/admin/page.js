"use client"

import { useSession } from 'next-auth/react';
import React from 'react';

const AdminPage = () => {
    const session = useSession();
    console.log(session);
    return (
        <div>
            <h1>Admin page</h1>
        </div>
    );
};

export default AdminPage;