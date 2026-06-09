import type { NotificationsRequestParams } from "@/features/notifications/types/notification";

export const QUERY_KEYS = {
    notifications: {
        all: () => ["notifications"] as const,
        list: (params?: NotificationsRequestParams) =>
            ["notifications", "list", ...Object.values(params || {})] as const,
        unreadCount: () => ["notifications", "unread-count"] as const,
    },
    auth: {
        all: () => ["auth"] as const,
        me: () => ["auth", "me"] as const,
        login: () => ["auth", "login"] as const,
        register: () => ["auth", "register"] as const,
        logout: () => ["auth", "logout"] as const,
    },
    posts: {
        all: () => ["posts"] as const,
        detail: (postId: string) => ["posts", postId] as const,
    },
    chat: {
        all: () => ["chat"] as const,
        conversations: () => ["chat", "conversations"] as const,
        messages: (id: string) => ["chat", "messages", id] as const,
    },
    voice: {
        all: () => ["voice"] as const,
        categories: () => ["voice", "categories"] as const,
        channels: (categoryId?: string) => ["voice", "channels", categoryId ?? "all"] as const,
        channel: (channelId: string) => ["voice", "channel", channelId] as const,
    },
    users: {
        profile: (id: string) => ["users", id] as const,
    },
};
