import { verifyRole } from '@/lib/core/session';
import React from 'react';

const userDashboardLayout = async ({children}) => {
    await verifyRole('user');
    return children;
};

export default userDashboardLayout;