import { Profile } from './profile.interface';

export interface Chat {
  id: number;
  userFirst: Profile;
  userSecond: Profile;
  messages: Message[];
  companion?: Profile;
}

export interface Message {
  id: number;
  userFromId: number;
  personalChatId: number;
  text: string;
  createdAt: string;
  isRead: boolean;
  updatedAt: string;
}

export interface LastMessage {
  id: number;
  text: string;
  created_at: string;
}

export interface LastMessageRes {
  id: number;
  user: Profile;
  message: LastMessage;
}
