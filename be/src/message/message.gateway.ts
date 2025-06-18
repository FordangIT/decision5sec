import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import MessageService from './message.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messageService: MessageService) {}

  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() data: { roomId: string; content: string; sender: string },
  ) {
    const savedMessage = await this.messageService.create(data);

    //클라이언트에 전파
    this.server.to(data.roomId).emit('message', {
      id: savedMessage._id,
      sender: savedMessage.sener,
      content: savedMessage.content,
      timestamp: savedMessage.timestamp,
    });
  }

  handleConnection(client: any) {
    const roomId = client.handshake.query.roomId;
    if (roomId) {
      client.join(roomId);
    }
  }
}
