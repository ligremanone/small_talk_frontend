import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  http = inject(HttpClient);
  chatsUrl = 'http://127.0.0.1:8000/api/v1/chat/';
  messageUrl = 'http://127.0.0.1:8000/api/v1/message/';

  createChat(userId: number) {
    return this.http.post(`${this.chatsUrl}${userId}`, {});
  }

  getMyChats() {
    return this.http.get(`${this.chatsUrl}get_my_chats/`);
  }

  getChatById(chatId: number) {
    return this.http.get(`${this.chatsUrl}${chatId}`);
  }

  sendMessage(chatId: number, message: string) {
    return this.http.post(
      `${this.messageUrl}${chatId}`,
      {},
      { params: { message } },
    );
  }

  constructor() {}
}
