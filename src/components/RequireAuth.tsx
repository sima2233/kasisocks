import React from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export function useAuth() {
    const [user, setUser] = React.useState<any>(null);
    React.useEffect(() => {
        const session = supabase.auth.getSession().then(({ data }) => {
            setUser(data?.session?.user || null);
        });
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user || null);
        });
        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);
    return user;
}

export function RequireAuth({ children }: { children: React.ReactNode }) {
    const user = useAuth();
    if (user === null) {
        return <Navigate to="/auth" replace />;
    }
    return <>{children}</>;
}
