import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface Notification {
    id: string;
    type: 'success' | 'error' | 'info';
    message: string;
    timestamp: number;
}

export default function Notifications() {
    const { flash } = usePage().props as any;
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        console.log('Flash messages:', flash); // Debug log
        if (flash?.success || flash?.error || flash?.info) {
            const newNotifications: Notification[] = [];
            
            if (flash.success) {
                newNotifications.push({
                    id: Date.now().toString(),
                    type: 'success',
                    message: flash.success,
                    timestamp: Date.now(),
                });
            }
            
            if (flash.error) {
                newNotifications.push({
                    id: Date.now().toString() + 1,
                    type: 'error',
                    message: flash.error,
                    timestamp: Date.now(),
                });
            }
            
            if (flash.info) {
                newNotifications.push({
                    id: Date.now().toString() + 2,
                    type: 'info',
                    message: flash.info,
                    timestamp: Date.now(),
                });
            }
            
            if (newNotifications.length > 0) {
                console.log('Adding notifications:', newNotifications); // Debug log
                setNotifications(prev => [...prev, ...newNotifications]);
            }
        }
    }, [flash]);

    useEffect(() => {
        const timer = setInterval(() => {
            setNotifications(prev => 
                prev.filter(notification => 
                    Date.now() - notification.timestamp < 3000
                )
            );
        }, 100);

        return () => clearInterval(timer);
    }, []);

    const removeNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-5 h-5" />;
            case 'error':
                return <AlertCircle className="w-5 h-5" />;
            case 'info':
                return <Info className="w-5 h-5" />;
            default:
                return <Info className="w-5 h-5" />;
        }
    };

    const getStyles = (type: string) => {
        switch (type) {
            case 'success':
                return 'bg-green-500 text-white border-green-600';
            case 'error':
                return 'bg-red-500 text-white border-red-600';
            case 'info':
                return 'bg-blue-500 text-white border-blue-600';
            default:
                return 'bg-gray-500 text-white border-gray-600';
        }
    };

    return (
        <div className="fixed top-4 right-4 z-50 space-y-2">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`flex items-center gap-3 p-4 rounded-lg border shadow-lg transform transition-all duration-300 animate-in slide-in-from-right ${getStyles(notification.type)}`}
                >
                    {getIcon(notification.type)}
                    <div className="flex-1">
                        <p className="font-medium">{notification.message}</p>
                    </div>
                    <button
                        onClick={() => removeNotification(notification.id)}
                        className="p-1 hover:bg-white/20 rounded transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ))}
        </div>
    );
}
