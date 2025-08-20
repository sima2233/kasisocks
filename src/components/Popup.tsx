import React, { useEffect, useRef, useState } from 'react';

interface PopupProps {
    message: string;
    show: boolean;
    onClose: () => void;
    targetElement?: HTMLElement | null;
    type?: 'success' | 'error' | 'info';
}

const Popup: React.FC<PopupProps> = ({ message, show, onClose, targetElement, type = 'info' }) => {
    const popupRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    useEffect(() => {
        if (show) {
            const timer = setTimeout(onClose, 4000);
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    useEffect(() => {
        if (show && targetElement && popupRef.current) {
            const targetRect = targetElement.getBoundingClientRect();
            const popupRect = popupRef.current.getBoundingClientRect();

            // Default: Position popup to the right of the button
            let left = targetRect.right + 10;
            let top = targetRect.top + (targetRect.height / 2) - (popupRect.height / 2);

            // Check if popup would go off the right edge of screen
            if (left + popupRect.width > window.innerWidth - 20) {
                // If not enough space on right, place on left
                left = targetRect.left - popupRect.width - 10;
                // If still off screen on left, center it horizontally
                if (left < 20) {
                    left = Math.max(20, (window.innerWidth - popupRect.width) / 2);
                }
            }

            // Adjust vertical position if needed
            if (top < 20) {
                top = 20;
            } else if (top + popupRect.height > window.innerHeight - 20) {
                top = window.innerHeight - popupRect.height - 20;
            }

            setPosition({ top, left });
        }
    }, [show, targetElement]);

    if (!show) return null;

    const getTypeStyles = () => {
        switch (type) {
            case 'success':
                return 'bg-green-500 text-white border-green-600';
            case 'error':
                return 'bg-red-500 text-white border-red-600';
            default:
                return 'bg-yellow-500 text-black border-yellow-600';
        }
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40"
                onClick={onClose}
            />

            {/* Popup */}
            <div
                ref={popupRef}
                className={`fixed z-50 px-4 py-3 rounded-lg shadow-xl border-2 font-medium max-w-xs ${getTypeStyles()} animate-fade-in`}
                style={{
                    top: `${position.top}px`,
                    left: `${position.left}px`,
                }}
            >
                <div className="flex items-center justify-between">
                    <span className="text-sm">{message}</span>
                    <button
                        onClick={onClose}
                        className="ml-3 text-lg leading-none hover:opacity-70"
                    >
                        ×
                    </button>
                </div>

                {/* Arrow pointer */}
                <div
                    className={`absolute w-0 h-0 border-8 ${targetElement && position.left > targetElement.getBoundingClientRect().right
                            ? 'border-l-0 border-r-current right-full top-1/2 -translate-y-1/2'
                            : 'border-r-0 border-l-current left-full top-1/2 -translate-y-1/2'
                        }`}
                    style={{
                        borderColor: type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#eab308',
                        borderTopColor: 'transparent',
                        borderBottomColor: 'transparent'
                    }}
                />
            </div>
        </>
    );
};

export default Popup;
