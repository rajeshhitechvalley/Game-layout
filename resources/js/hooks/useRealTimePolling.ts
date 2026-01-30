import { useState, useEffect, useRef } from 'react';

interface UseRealTimePollingOptions {
    interval?: number; // Polling interval in milliseconds
    enabled?: boolean; // Whether polling is enabled
}

export function useRealTimePolling<T>(
    fetchFunction: () => Promise<T>,
    initialData: T,
    options: UseRealTimePollingOptions = {}
) {
    const { interval = 5000, enabled = true } = options;
    const [data, setData] = useState<T>(initialData);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!enabled) {
            setIsConnected(false);
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
            return;
        }

        const poll = async () => {
            try {
                const result = await fetchFunction();
                setData(result);
                setIsConnected(true);
                setError(null);
            } catch (err) {
                console.error('Polling error:', err);
                setError(err instanceof Error ? err.message : 'Unknown error');
                setIsConnected(false);
            }
        };

        // Initial poll
        poll();

        // Set up interval polling
        intervalRef.current = setInterval(poll, interval);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [fetchFunction, interval, enabled]);

    // Simulate online status for demo purposes
    useEffect(() => {
        if (enabled) {
            setIsConnected(true);
        }
    }, [enabled]);

    return { data, isConnected, error };
}
