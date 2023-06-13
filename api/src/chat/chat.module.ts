/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatRoom, ChatRoomSchema } from './schema/post.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: ChatRoom.name,
                schema: ChatRoomSchema
            }
        ])
    ],
    controllers: [],
    providers: [ChatGateway]
})
export class ChatModule {}
