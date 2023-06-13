import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Chat {
    @Prop({
        type: String,
        required: true
    })
    content: string;
    @Prop({
        type: Types.ObjectId,
        required: true
    })
    userSendedId: ObjectId;
    @Prop({
        type: [String],
        default: []
    })
    fileUrl: string[];
}

@Schema({ timestamps: true })
export class ChatRoom {
    @Prop({
        type: String
    })
    roomName: string;
    @Prop({
        type: [Types.ObjectId],
        required: true
    })
    members: ObjectId[];

    @Prop({ type: Array<Chat>, default: [] })
    chats: Chat[];
}

export type ChatRoomDocument = HydratedDocument<ChatRoom>;
export const ChatRoomSchema = SchemaFactory.createForClass(ChatRoom);
