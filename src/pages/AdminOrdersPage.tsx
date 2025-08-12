import React, { useEffect, useState } from 'react';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { useNavigate } from 'react-router-dom';

const AdminOrdersPage: React.FC = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const user = useCurrentUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (user === undefined) return; // Wait for user to load
        async function fetchOrders() {
            try {
                const { supabase } = await import('../supabaseClient');
                let query = supabase.from('orders').select('*').order('created_at', { ascending: false });
                if (statusFilter) {
                    query = query.eq('status', statusFilter);
                }
                // Only apply date filters if set
                if (dateFrom && dateTo) {
                    query = query.gte('created_at', dateFrom).lte('created_at', dateTo);
                } else if (dateFrom) {
                    query = query.gte('created_at', dateFrom);
                } else if (dateTo) {
                    query = query.lte('created_at', dateTo);
                }
                const { data, error } = await query;
                if (error) setError(error.message);
                else {
                    // Fetch user emails for each order
                    const userIds = Array.from(new Set(data.map((order: any) => order.user_id)));
                    const { data: usersData, error: usersError } = await supabase
                        .from('profiles')
                        .select('id,email')
                        .in('id', userIds);
                    if (usersError) {
                        setOrders(data.map((order: any) => ({ ...order, user_email: order.user_id })));
                    } else {
                        const idToEmail: Record<string, string> = {};
                        usersData.forEach((u: any) => { idToEmail[u.id] = u.email; });
                        setOrders(data.map((order: any) => ({ ...order, user_email: idToEmail[order.user_id] || order.user_id })));
                    }
                }
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        }
        fetchOrders();
    }, [user, statusFilter, dateFrom, dateTo]);

    if (user === undefined) return <div className="py-12 text-center">Loading user...</div>;
    if (loading) return <div className="py-12 text-center">Loading orders...</div>;
    if (error) return <div className="py-12 text-center text-red-600">{error}</div>;

    const statusOptions = ['pending', 'paid', 'shipped', 'completed', 'cancelled'];
    const handleStatusChange = async (orderId: number, newStatus: string) => {
        try {
            const { supabase } = await import('../supabaseClient');
            const { error } = await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
            if (!error) {
                setOrders(orders => orders.map(order => order.id === orderId ? { ...order, status: newStatus } : order));
            } else {
                setError(error.message);
            }
        } catch (err) {
            setError((err as Error).message);
        }
    };
    return (
        <div className="max-w-7xl mx-auto py-12">
            <h2 className="text-3xl font-bold mb-6 text-center">All Orders</h2>
            <div className="bg-white shadow rounded p-8">
                <div className="flex flex-wrap gap-4 mb-6 items-end">
                    <div>
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="border rounded px-2 py-1">
                            <option value="">All</option>
                            {statusOptions.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Date From</label>
                        <input type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} className="border rounded px-2 py-1" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Date To</label>
                        <input type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} className="border rounded px-2 py-1" />
                    </div>
                </div>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b">
                            <th className="py-2 px-3">Order ID</th>
                            <th className="py-2 px-3">Date</th>
                            <th className="py-2 px-3">User</th>
                            <th className="py-2 px-3">Method</th>
                            <th className="py-2 px-3">Location</th>
                            <th className="py-2 px-3">Phone</th>
                            <th className="py-2 px-3">Status</th>
                            <th className="py-2 px-3">Total</th>
                            <th className="py-2 px-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id} className="border-b hover:bg-gray-50">
                                <td className="py-2 px-3 font-mono">{order.id}</td>
                                <td className="py-2 px-3">{new Date(order.created_at).toLocaleString()}</td>
                                <td className="py-2 px-3">{order.user_email}</td>
                                <td className="py-2 px-3">{order.delivery_method}</td>
                                <td className="py-2 px-3">{order.location}</td>
                                <td className="py-2 px-3">{order.phone}</td>
                                <td className="py-2 px-3 font-semibold">
                                    <select
                                        value={order.status}
                                        onChange={e => handleStatusChange(order.id, e.target.value)}
                                        className="border rounded px-2 py-1"
                                    >
                                        {statusOptions.map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                </td>
                                <td className="py-2 px-3 font-bold">R{order.total.toFixed(2)}</td>
                                <td className="py-2 px-3">
                                    <button
                                        className="bg-black text-white py-1 px-3 rounded text-sm hover:bg-gray-900"
                                        onClick={() => navigate(`/invoice/${order.id}`)}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {orders.length === 0 && <div className="text-center py-8 text-gray-500">No orders found.</div>}
            </div>
        </div>
    );
};

export default AdminOrdersPage;
