import { useEffect, useRef, useState } from 'react';

interface WebSocketMessage {
    event: string;
    data: any;
}

interface UseWebSocketReturn {
    isConnected: boolean;
    sendMessage: (event: string, data: any) => void;
    lastMessage: WebSocketMessage | null;
}

export function useWebSocket(channel: string): UseWebSocketReturn {
    const [isConnected, setIsConnected] = useState(false);
    const [lastMessage, setLastMessage] = useState<WebSocketMessage | null>(null);
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        // Create WebSocket connection
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const wsUrl = `${protocol}//${window.location.host}/ws/${channel}`;
        
        ws.current = new WebSocket(wsUrl);

        ws.current.onopen = () => {
            setIsConnected(true);
            console.log(`Connected to WebSocket channel: ${channel}`);
        };

        ws.current.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data) as WebSocketMessage;
                setLastMessage(message);
            } catch (error) {
                console.error('Failed to parse WebSocket message:', error);
            }
        };

        ws.current.onclose = () => {
            setIsConnected(false);
            console.log(`Disconnected from WebSocket channel: ${channel}`);
            
            // Attempt to reconnect after 3 seconds
            setTimeout(() => {
                if (ws.current?.readyState === WebSocket.CLOSED) {
                    ws.current = new WebSocket(wsUrl);
                }
            }, 3000);
        };

        ws.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [channel]);

    const sendMessage = (event: string, data: any) => {
        if (ws.current?.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({ event, data }));
        }
    };

    return { isConnected, sendMessage, lastMessage };
}
