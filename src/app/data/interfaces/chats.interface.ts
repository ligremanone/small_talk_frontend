import { Profile } from './profile.interface';

export interface Chat {
  id: number;
  user_first: Profile;
  user_second: Profile;
  messages: Message[];
  companion?: Profile;
}

export interface Message {
  id: number;
  userFromId: number;
  personalChatId: number;
  text: string;
  created_at: string;
  isRead: boolean;
  updatedAt: string;
  user: Profile;
  isMine?: boolean;
}

export interface LastMessage {
  id: number;
  text: string;
  created_at: string;
}

export interface LastMessageRes {
  id: number;
  user: Profile;
  message: LastMessage | null;
}

export interface MessageCreateDto {
  chat_id: number;
  text: string;
}
