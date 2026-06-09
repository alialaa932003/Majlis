import { type ReactNode, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUnreadCount } from "@/features/notifications/hooks/useUnreadCount";
import { useNotificationSocket } from "@/features/notifications/hooks/useNotificationSocket";
import { useNotificationStore } from "@/store/notificationStore";
import socket from "@/lib/socket";
import { QUERY_KEYS } from "@/constants/queryKeys";

type Props = { children: ReactNode };

function SocketProvider({ children }: Props) {
  const queryClient = useQueryClient();
  const user = localStorage.getItem("token");
  const [isConnected, setIsConnected] = useState(socket.connected);

  const setUnreadCount = useNotificationStore((state) => state.setUnreadCount);
  const { data: unreadData } = useUnreadCount(!!user);

  useEffect(() => {
    if (unreadData?.data.unreadCount !== undefined) {
      setUnreadCount(unreadData.data.unreadCount);
    }
  }, [unreadData, setUnreadCount]);

  useEffect(() => {
    if (!user) return;

    socket.connect();

    const onConnect = () => {
      console.log("Connected to socket server");
      setIsConnected(true);
      // Ensure we fetch any notifications missed while disconnected
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.notifications.all() });
    };

    const onDisconnect = () => setIsConnected(false);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", (err) => {
      console.log("Connection error occurred: ", err.message);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.disconnect();
    };
  }, [user, queryClient]);

  useNotificationSocket(isConnected);

  return <>{children}</>;
}

export default SocketProvider;
