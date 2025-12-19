import { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { pushNotification } from "../features/notifications/notificationsSlice";

export default function useSocket() {
  const dispatch = useDispatch();
  const user = useSelector(s => s.auth.user);

  useEffect(() => {
    if (!user) return;

    const socket = io(import.meta.env.VITE_SOCKET_BASE || "http://localhost:5000");

    socket.emit("join", { userId: user.id, role: user.role });

    socket.on("order:new", data =>
      dispatch(pushNotification({ title: "New Order", body: data }))
    );

    socket.on("order:updated", data =>
      dispatch(pushNotification({ title: "Order Updated", body: data }))
    );

    socket.on("stock:low", data =>
      dispatch(pushNotification({ title: "Low Stock Alert", body: data }))
    );

    return () => socket.disconnect();
  }, [user, dispatch]);
}
