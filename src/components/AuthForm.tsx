import React, { useState } from 'react';
import Toast from './Toast';
import Threads from './Threads';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function AuthForm({ onAuth }: { onAuth?: () => void }) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMsg, setToastMsg] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                if (onAuth) onAuth();
                navigate('/'); // Redirect to home page after successful login
            } else {
                if (password !== confirmPassword) {
                    setError('Passwords do not match');
                    setLoading(false);
                    return;
                }
                const { data, error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;
                // Insert user into profiles table with default role 'user'
                const userId = data?.user?.id;
                if (userId) {
                    await supabase.from('profiles').insert({ id: userId, email, role: 'user' });
                }
                setToastMsg('Please check your email and confirm your account before logging in.');
                setShowToast(true);
                setIsLogin(true); // Switch to login view after signup
                // Do NOT redirect to home, stay on auth page
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ width: '100%', height: '100vh', position: 'relative', background: 'black' }}>
            <Threads amplitude={1} distance={0} enableMouseInteraction={true} />
            <Toast message={toastMsg} show={showToast} onClose={() => setShowToast(false)} />
            <div className="flex flex-col items-center justify-center min-h-screen absolute top-0 left-0 w-full h-full">
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                    <h2 className="text-2xl font-bold mb-6 text-center">{isLogin ? 'Login' : 'Sign Up'}</h2>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    {!isLogin && (
                        <div className="mb-6">
                            <label className="block mb-2 text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={e => setConfirmPassword(e.target.value)}
                                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
                                required
                            />
                        </div>
                    )}
                    {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded font-semibold hover:bg-blue-700 transition"
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
                    </button>
                    <div className="mt-4 text-center">
                        <button
                            type="button"
                            className="text-blue-600 hover:underline text-sm"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
