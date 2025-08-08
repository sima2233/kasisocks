import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminRole } from '../hooks/useAdminRole';

export function RequireAdmin({ children }: { children: React.ReactNode }) {
    const isAdmin = useAdminRole();
    if (isAdmin === undefined) {
        // Show spinner while loading admin status
        return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500" /></div>;
    }
    if (!isAdmin) {
        return <Navigate to="/" replace />;
    }
    return <>{children}</>;
}
