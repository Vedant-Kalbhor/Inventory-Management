import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markRead, markAllRead } from '../../features/notifications/notificationsSlice';
import useSocket from '../../hooks/useSocket';
import { pushNotification } from '../../features/notifications/notificationsSlice';

export default function NotificationsCenter() {
  const socket = useSocket();
  const dispatch = useDispatch();
  const list = useSelector(s => s.notifications.list);

  useEffect(() => {
    if (!socket) return;
    // example events: 'stock:low', 'order:created', 'order:updated'
    socket.on('stock:low', (payload) => dispatch(pushNotification({ title: 'Low stock', body: payload })));
    socket.on('order:created', (payload) => dispatch(pushNotification({ title: 'New order', body: payload })));
    socket.on('order:updated', (payload) => dispatch(pushNotification({ title: 'Order update', body: payload })));
    return () => {
      socket.off('stock:low');
      socket.off('order:created');
      socket.off('order:updated');
    };
  }, [socket, dispatch]);

  return (
    <div className="bg-white p-3 rounded shadow w-full">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold">Notifications</h4>
        <div>
          <button onClick={() => dispatch(markAllRead())} className="text-sm text-indigo-600">Mark all read</button>
        </div>
      </div>

      <div className="space-y-2 max-h-64 overflow-auto">
        {list.length === 0 && <div className="text-sm text-gray-500">No notifications</div>}
        {list.map(n => (
          <div key={n.id} className={`p-2 border rounded ${n.read ? 'bg-gray-50' : 'bg-white'}`}>
            <div className="flex justify-between">
              <div className="font-medium">{n.title}</div>
              <div className="text-xs text-gray-500">{n.timestamp ? new Date(n.timestamp).toLocaleTimeString() : ''}</div>
            </div>
            <div className="text-sm text-gray-700">{typeof n.body === 'object' ? JSON.stringify(n.body) : n.body}</div>
            {!n.read && <button onClick={() => dispatch(markRead(n.id))} className="mt-2 text-xs text-indigo-600">Mark read</button>}
          </div>
        ))}
      </div>
    </div>
  );
}
