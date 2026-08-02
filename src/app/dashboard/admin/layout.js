import { verifyRole } from '@/lib/core/session';
import React from 'react';

const adminDashboardLayout = async ({ children }) => {
    await verifyRole('admin');
    return children;
};

export default adminDashboardLayout;