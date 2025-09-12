import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export default function useSocket() {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!socketRef.current) {
      const url = (import.meta.env.VITE_API_BASE || 'http://localhost:5000').replace('/api', '');
      socketRef.current = io(url, { autoConnect: true });
    }
    return () => {
      if (socketRef.current) socketRef.current.disconnect();
    };
  }, []);

  return socketRef.current;
}
