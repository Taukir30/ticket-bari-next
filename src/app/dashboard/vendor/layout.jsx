import { verifyRole } from '@/lib/core/session';
import React from 'react';

const vendorDashboardLayout = async ({children}) => {
    await verifyRole('vendor');
    return children;
};

export default vendorDashboardLayout;