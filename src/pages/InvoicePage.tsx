import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const InvoicePage: React.FC = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        async function fetchOrder() {
            try {
                const { supabase } = await import('../supabaseClient');
                const { data, error } = await supabase.from('orders').select('*').eq('id', orderId).single();
                if (error) {
                    setError(error.message);
                } else {
                    setOrder(data);
                }
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        }
        fetchOrder();
    }, [orderId]);

    if (loading) return <div className="py-12 text-center">Loading invoice...</div>;
    if (error) return <div className="py-12 text-center text-red-600">{error}</div>;
    if (!order) return <div className="py-12 text-center">Order not found.</div>;

    return (
        <div className="max-w-2xl mx-auto py-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Invoice</h2>
            <div className="bg-white shadow rounded p-6 border border-black/10">
                <div className="mb-4">
                    <span className="font-semibold">Order ID:</span> {order.id}
                </div>
                <div className="mb-4">
                    <span className="font-semibold">Date:</span> {new Date(order.created_at).toLocaleString()}
                </div>
                <div className="mb-4">
                    <span className="font-semibold">Delivery Method:</span> {order.delivery_method}
                </div>
                <div className="mb-4">
                    <span className="font-semibold">Location:</span> {order.location}
                </div>
                <div className="mb-4">
                    <span className="font-semibold">Phone:</span> {order.phone}
                </div>
                <div className="mb-4">
                    <span className="font-semibold">Notes:</span> {order.notes || 'None'}
                </div>
                <div className="mb-4">
                    <span className="font-semibold">Status:</span> {order.status}
                </div>
                <div className="mb-4">
                    <span className="font-semibold">Items:</span>
                    <ul className="list-disc ml-6">
                        {order.items.map((item: any, idx: number) => (
                            <li key={idx}>
                                {item.name} (x{item.quantity}) - R{item.price.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="font-bold text-xl mt-6">Total: R{order.total.toFixed(2)}</div>
            </div>
        </div>
    );
};

export default InvoicePage;
