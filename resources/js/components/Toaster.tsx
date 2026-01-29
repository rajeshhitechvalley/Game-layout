import { CheckCircle, Heart, Bookmark, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Toast {
    id: string;
    type: 'bookmark' | 'favorite' | 'unbookmark' | 'unfavorite';
    message: string;
    gameTitle: string;
    timestamp: number;
}

export default function Toaster() {
    const [toasts, setToasts] = useState<Toast[]>([]);

    // Listen for custom toast events
    useEffect(() => {
        const handleToast = (event: CustomEvent) => {
            const { type, message, gameTitle } = event.detail;
            
            const newToast: Toast = {
                id: Date.now().toString(),
                type,
                message,
                gameTitle,
                timestamp: Date.now(),
            };
            
            setToasts(prev => [...prev, newToast]);
        };

        window.addEventListener('showToast', handleToast as EventListener);
        
        return () => {
            window.removeEventListener('showToast', handleToast as EventListener);
        };
    }, []);

    // Auto-remove toasts after 3 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setToasts(prev => 
                prev.filter(toast => 
                    Date.now() - toast.timestamp < 3000
                )
            );
        }, 100);

        return () => clearInterval(timer);
    }, []);

    const removeToast = (id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'bookmark':
                return <Bookmark className="w-5 h-5 text-blue-600 drop-shadow-sm" />;
            case 'favorite':
                return <Heart className="w-5 h-5 text-red-600 drop-shadow-sm fill-current" />;
            case 'unbookmark':
                return <Bookmark className="w-5 h-5 text-gray-500" />;
            case 'unfavorite':
                return <Heart className="w-5 h-5 text-gray-500" />;
            default:
                return <CheckCircle className="w-5 h-5" />;
        }
    };

    const getStyles = (type: string) => {
        switch (type) {
            case 'bookmark':
                return 'bg-gradient-to-r from-blue-50 to-blue-100 border-blue-300 text-blue-900 shadow-blue-200/50';
            case 'favorite':
                return 'bg-gradient-to-r from-red-50 to-red-100 border-red-300 text-red-900 shadow-red-200/50';
            case 'unbookmark':
                return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300 text-gray-700 shadow-gray-200/50';
            case 'unfavorite':
                return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300 text-gray-700 shadow-gray-200/50';
            default:
                return 'bg-gradient-to-r from-white to-gray-50 border-gray-300 text-gray-900 shadow-gray-200/50';
        }
    };

    return (
        <div className="fixed top-20 right-4 z-50 space-y-3 pointer-events-none">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    className={`pointer-events-auto flex items-center gap-3 p-4 rounded-xl border-2 backdrop-blur-sm transform transition-all duration-500 ease-out animate-in slide-in-from-right hover:scale-105 hover:shadow-2xl ${getStyles(toast.type)}`}
                >
                    <div className="flex-shrink-0 p-1 rounded-lg bg-white/50 backdrop-blur-sm">
                        {getIcon(toast.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm leading-tight mb-0.5">{toast.message}</p>
                        <p className="text-xs opacity-75 truncate font-medium">{toast.gameTitle}</p>
                    </div>
                    <button
                        onClick={() => removeToast(toast.id)}
                        className="flex-shrink-0 p-1.5 hover:bg-white/30 rounded-lg transition-all duration-200 hover:rotate-90 active:scale-95"
                    >
                        <X className="w-4 h-4 opacity-70 hover:opacity-100" />
                    </button>
                </div>
            ))}
        </div>
    );
}

// Helper function to show toasts
export const showToast = (type: 'bookmark' | 'favorite' | 'unbookmark' | 'unfavorite', message: string, gameTitle: string) => {
    const event = new CustomEvent('showToast', {
        detail: { type, message, gameTitle }
    });
    window.dispatchEvent(event);
};
