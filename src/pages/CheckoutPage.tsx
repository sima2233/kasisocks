import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../hooks/useCurrentUser';
import Toast from '../components/Toast';
import { Product } from '../types';

interface CheckoutPageProps {
    cartItems: { product: Product; quantity: number }[];
    clearCart: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cartItems, clearCart }) => {
    const [deliveryMethod, setDeliveryMethod] = useState('delivery');
    const [location, setLocation] = useState('');
    const [phone, setPhone] = useState('');
    const [notes, setNotes] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMsg, setToastMsg] = useState('');
    const user = useCurrentUser();
    const navigate = useNavigate();

    const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            setToastMsg('Please log in to checkout.');
            setShowToast(true);
            return;
        }
        try {
            const { supabase } = await import('../supabaseClient');
            const { data, error } = await supabase.from('orders').insert([
                {
                    user_id: user.id,
                    items: cartItems.map(item => ({
                        product_id: item.product.id,
                        name: item.product.name,
                        price: item.product.price,
                        quantity: item.quantity,
                    })),
                    total,
                    delivery_method: deliveryMethod,
                    location,
                    phone,
                    notes,
                }
            ]).select();
            if (error) {
                setToastMsg('Order failed: ' + error.message);
                setShowToast(true);
            } else {
                setToastMsg('Order placed successfully!');
                setShowToast(true);
                clearCart();
                // Redirect to invoice page with order id
                navigate(`/invoice/${data[0].id}`);
            }
        } catch (err) {
            setToastMsg('Order failed: ' + (err as Error).message);
            setShowToast(true);
        }
    };

    return (
        <div className="max-w-xl mx-auto py-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Checkout</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block font-medium mb-2">Delivery Method</label>
                    <select value={deliveryMethod} onChange={e => setDeliveryMethod(e.target.value)} className="w-full border px-3 py-2 rounded">
                        <option value="delivery">Delivery</option>
                        <option value="pickup">Pickup</option>
                    </select>
                </div>
                <div>
                    <label className="block font-medium mb-2">Location</label>
                    <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="w-full border px-3 py-2 rounded" placeholder="Address or pickup location" required />
                </div>
                <div>
                    <label className="block font-medium mb-2">Phone</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full border px-3 py-2 rounded" placeholder="Your phone number" required />
                </div>
                <div>
                    <label className="block font-medium mb-2">Notes (optional)</label>
                    <textarea value={notes} onChange={e => setNotes(e.target.value)} className="w-full border px-3 py-2 rounded" placeholder="Any special instructions" />
                </div>
                <div className="font-bold text-lg">Total: R{total.toFixed(2)}</div>
                <button type="submit" className="w-full bg-black text-white py-3 rounded font-semibold hover:bg-gray-900 transition">Place Order</button>
            </form>
            <Toast message={toastMsg} show={showToast} onClose={() => setShowToast(false)} />
        </div>
    );
};

export default CheckoutPage;
