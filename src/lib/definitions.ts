interface Response {
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
}

export interface VideoType extends Response {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  views: number;
  userId: number;
  createdAt: string;
  user: UserType;
}

export interface UserType {
  id: number;
  name: string;
  email: string;
  imageUrl: string;
  createdAt: Date;
  subscribedUsers: SubscriptionType[];
  subscribers: number;
}

export interface SubscriptionType {
  id: number;
  name: string;
}
