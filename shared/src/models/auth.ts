// Auth types

// Base response type for all API responses
export type BaseResponse = {
  success: boolean;
  message?: string;
}

export type User = {
  id: number;
  username: string;
  name: string;
  surname: string;
  mail?: string;
  image?: string;
  isAdmin?: boolean;
}

export type LoginRequest = {
  username: string;
  password: string;
  userAgent?: string;
}

export type AuthResponse = BaseResponse & {
  user?: User;
  token?: string;
}

export type ChangePasswordRequest = {
  currentPassword: string;
  newPassword: string;
  jwtToken: string;
}

export type AdminChangePasswordRequest = {
  userName: string;
  newPassword: string;
  jwtToken: string;
}

export type ChangePasswordResponse = BaseResponse;

export type UserSession = {
  sessionToken: string;
  createdAt: string;
  lastActivity: string;
  expiresAt: string;
  isActive: boolean;
  isCurrent: boolean;
}

export type SessionsResponse = BaseResponse & {
  sessions?: UserSession[];
}

export type TokenValidationResponse = {
  valid: boolean;
  userId?: number;
  username?: string;
  name?: string;
  surname?: string;
  mail?: string;
  image?: string;
  isAdmin?: boolean;
}

export type RefreshTokenResponse = BaseResponse & {
  token?: string;
}

export type LogoutResponse = BaseResponse;

export type RegisterRequest = {
  username: string;
  name: string;
  surname: string;
  password: string;
  mail: string;
  image: string;
}

export type UpdateUserInfoRequest = {
  name?: string;
  surname?: string;
  mail?: string;
  image?: string;
}
