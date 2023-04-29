/*
https://docs.nestjs.com/websockets/gateways#gateways
*/

import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit
} from '@nestjs/websockets';
import { log } from 'console';

@WebSocketGateway(8080)
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit {
    @WebSocketServer()
    server: any;

    @SubscribeMessage('connect')
    handleEvent(@MessageBody() data: string) {
        this.server.emit('connect', data);
    }

    handleConnection(client: any, ...args: any[]) {
        console.log('User connected');
        client.emit('connect_success', 'ok');
    }

    handleDisconnect(client: any) {
        console.log('User disconnected');
    }

    afterInit(server: any) {
        console.log('Socket is live');
    }
}
