export interface Response {
  message: string;
  errorCode: string;
}

export interface AuthenticationResponse extends Response {
  user: UserType;
  token: string;
}

export interface RegisterResponse extends Response {
  user: UserType;
  token: string;
}

export interface HistoryType {
  userId: number;
  videoId: number;
  video: VideoType;
  watchedAt: string;
  videoDeleted: boolean;
  videoVisible: boolean;
}

export interface VideoType extends Response {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  views: number;
  createdAt: string;
  user: UserType;
  likedUsers: number[];
  comments: CommentType[];
  visibility: "PUBLIC" | "PRIVATE";
}

export interface CommentType {
  id: number;
  videoId: number;
  text: string;
  user: UserType;
  createdAt: string;
}

export interface UserType extends Response {
  id: number;
  name: string;
  email: string;
  profileImageUrl: string;
  createdAt: string;
  subscribedUsers: SubscriptionType[];
  subscribers: number;
}

export interface SubscriptionType {
  id: number;
  name: string;
  profileImageUrl: string;
}
