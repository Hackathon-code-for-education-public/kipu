import { Logger } from '@nestjs/common';
import { WebSocketGateway, OnGatewayConnection, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayConnection {
  private readonly logger = new Logger(SocketGateway.name);

  @WebSocketServer()
  private server: Socket;

  handleConnection(socket: Socket): void {
    console.log('handleConnection gateway');
  }
  
  @SubscribeMessage('getRooms')
  getRooms() {
    return {
      rooms: [1,2,3]
    }
  }
}