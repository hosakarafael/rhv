export interface AuthenticationResponse {
  user: UserType;
  token: string;
}

export interface VideoType {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  views: number;
  userId: number;
  createdAt: Date;
  user: UserType;
}

export interface UserType {
  id: number;
  name: string;
  email: string;
  imageUrl: string;
  createdAt: Date;
}
