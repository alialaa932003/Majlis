export interface INotificationSender {
  _id: string;
  username: string;
  avatar?: string;
}

interface IBaseNotification {
  _id: string;
  recipient: string;
  sender: INotificationSender;
  isRead: boolean;
  createdAt: string;
}

export interface ILikeNotification extends IBaseNotification {
  type: "like";
  post: { _id: string };
}

export interface ICommentNotification extends IBaseNotification {
  type: "comment";
  post: { _id: string };
  commentText?: string;
}

export interface IFriendRequestNotification extends IBaseNotification {
  type: "friend_request";
  post?: never;
}

export interface IFriendAcceptNotification extends IBaseNotification {
  type: "friend_accept";
  post?: never;
}

export type INotification =
  | ILikeNotification
  | ICommentNotification
  | IFriendRequestNotification
  | IFriendAcceptNotification;

export interface NotificationsMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface NotificationsResponse {
  status: string;
  data: {
    notifications: INotification[];
    meta: NotificationsMeta;
  };
}

export interface NotificationsRequestParams {
  limit?: number;
  page?: number;
  unreadOnly?: boolean;
}

export interface UnreadCountResponse {
  status: string;
  data: {
    unreadCount: number;
  };
}
