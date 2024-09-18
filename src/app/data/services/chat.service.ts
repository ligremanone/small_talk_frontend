import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chat, LastMessageRes, Message } from '../interfaces/chats.interface';
import { ProfileService } from './profile.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  http = inject(HttpClient);
  chatsUrl = 'http://127.0.0.1:8000/api/v1/chat/';
  messageUrl = 'http://127.0.0.1:8000/api/v1/message/';
  me = inject(ProfileService).me;

  createChat(userId: number) {
    return this.http.post<Chat>(`${this.chatsUrl}${userId}`, {});
  }

  getMyChats() {
    return this.http.get<LastMessageRes[]>(`${this.chatsUrl}get_my_chats`);
  }

  getChatById(chatId: number) {
    return this.http.get<Chat>(`${this.chatsUrl}${chatId}`).pipe(
      map((chat) => {
        return {
          ...chat,
          companion:
            chat.userFirst.id === this.me()!.id
              ? chat.userSecond
              : chat.userFirst,
        };
      }),
    );
  }

  sendMessage(chatId: number, message: string) {
    return this.http.post<Message>(
      `${this.messageUrl}${chatId}`,
      {},
      { params: { message } },
    );
  }

  constructor() {}
}
