import { Component, inject, input, signal } from '@angular/core';
import { ChatWorkspaceMessageComponent } from './chat-workspace-message/chat-workspace-message.component';
import { MessageInputComponent } from '../../../../common ui/message-input/message-input.component';
import { ChatService } from '../../../../data/services/chat.service';
import { Chat, Message } from '../../../../data/interfaces/chats.interface';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-chat-workspace-messages-wrapper',
  standalone: true,
  imports: [ChatWorkspaceMessageComponent, MessageInputComponent],
  templateUrl: './chat-workspace-messages-wrapper.component.html',
  styleUrl: './chat-workspace-messages-wrapper.component.scss',
})
export class ChatWorkspaceMessagesWrapperComponent {
  chatService = inject(ChatService);
  chat = input.required<Chat>();
  messages = this.chatService.activeChatMessages;

  async onSendMessage(message: string) {
    await firstValueFrom(
      this.chatService.sendMessage({ chat_id: this.chat().id, text: message }),
    );
    await firstValueFrom(this.chatService.getChatById(this.chat().id));
  }
}
