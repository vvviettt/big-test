import {Message} from './message';

export interface Room {
  image?: string;
  roomId: string;
  roomName?: string;
  type: 'NORMAL' | 'GROUP';
  users: {
    id: string;
    name: string;
    imageUrl?: string;
  }[];
  lastMessage: Message;
  messages: Message[];
}
