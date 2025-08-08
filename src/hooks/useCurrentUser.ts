import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export function useCurrentUser() {
    const [user, setUser] = useState<any>(undefined);
    useEffect(() => {
        async function fetchUserWithProfile() {
            const { data } = await supabase.auth.getUser();
            const authUser = data?.user;
            if (authUser) {
                // Fetch profile from profiles table
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', authUser.id)
                    .single();
                setUser({ ...authUser, role: profile?.role || 'user' });
            } else {
                setUser(null);
            }
        }
        fetchUserWithProfile();
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', session.user.id)
                    .single()
                    .then(({ data: profile }) => {
                        setUser({ ...session.user, role: profile?.role || 'user' });
                    });
            } else {
                setUser(null);
            }
        });
        return () => {
            listener.subscription.unsubscribe();
        };
    }, []);
    return user;
}
