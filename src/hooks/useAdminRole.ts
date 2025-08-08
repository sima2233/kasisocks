import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export function useAdminRole() {
    const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);
    useEffect(() => {
        supabase.auth.getUser().then(async ({ data }) => {
            const user = data?.user;
            if (!user) {
                setIsAdmin(false);
                return;
            }
            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single();
            setIsAdmin(profile?.role === 'admin');
        });
    }, []);
    return isAdmin;
}
