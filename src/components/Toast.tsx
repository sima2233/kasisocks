import React from 'react';

interface ToastProps {
    message: string;
    show: boolean;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, show, onClose }) => {
    React.useEffect(() => {
        if (show) {
            const timer = setTimeout(onClose, 3000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    if (!show) return null;
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-yellow-500 text-black px-6 py-3 rounded shadow-lg z-50 font-medium animate-fade-in">
            {message}
        </div>
    );
};

export default Toast;
