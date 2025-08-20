import { useState, useCallback } from 'react';

interface PopupState {
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
    targetElement: HTMLElement | null;
}

export const usePopup = () => {
    const [popupState, setPopupState] = useState<PopupState>({
        show: false,
        message: '',
        type: 'info',
        targetElement: null
    });

    const showPopup = useCallback((
        message: string, 
        targetElement: HTMLElement | null = null, 
        type: 'success' | 'error' | 'info' = 'info'
    ) => {
        setPopupState({
            show: true,
            message,
            type,
            targetElement
        });
    }, []);

    const hidePopup = useCallback(() => {
        setPopupState(prev => ({ ...prev, show: false }));
    }, []);

    return {
        popupState,
        showPopup,
        hidePopup
    };
};
