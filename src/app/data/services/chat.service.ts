import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Chat,
  LastMessageRes,
  Message,
  MessageCreateDto,
} from '../interfaces/chats.interface';
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
  activeChatMessages = signal<Message[]>([]);

  createChat(userId: number) {
    return this.http.post<Chat>(`${this.chatsUrl}${userId}`, {});
  }

  getMyChats() {
    return this.http.get<LastMessageRes[]>(`${this.chatsUrl}get_my_chats`);
  }

  getChatById(chatId: number) {
    return this.http.get<Chat>(`${this.chatsUrl}${chatId}`).pipe(
      map((chat) => {
        const patchedMessages = chat.messages.map((message) => {
          return {
            ...message,
            isMine: message.user.id === this.me()!.id,
          };
        });
        this.activeChatMessages.set(patchedMessages);
        return {
          ...chat,
          messages: patchedMessages,
        };
      }),
    );
  }

  sendMessage(payload: MessageCreateDto) {
    return this.http.post<Message>(`${this.messageUrl}`, payload);
  }

  constructor() {}
}
