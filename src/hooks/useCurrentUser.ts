import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export function useCurrentUser() {
    const [user, setUser] = useState<any>(undefined);
    useEffect(() => {
        async function fetchUserWithProfile() {
            const { data } = await supabase.auth.getUser();
            const authUser = data?.user;
            console.log('useCurrentUser initial:', { authUser });
            if (authUser) {
                // Fetch profile from profiles table
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', authUser.id)
                    .single();
                console.log('useCurrentUser profile:', { profile });
                setUser({ ...authUser, role: profile?.role || 'user' });
            } else {
                setUser(null);
            }
        }
        fetchUserWithProfile();
        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            console.log('useCurrentUser onAuthStateChange:', { session });
            if (session?.user) {
                supabase
                    .from('profiles')
                    .select('role')
                    .eq('id', session.user.id)
                    .single()
                    .then(({ data: profile }) => {
                        console.log('useCurrentUser profile (onAuthStateChange):', { profile });
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
