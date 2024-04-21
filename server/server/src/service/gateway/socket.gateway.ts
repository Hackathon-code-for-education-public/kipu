import { WebSocketGateway, OnGatewayConnection, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway(8080, {
  cors: {
    origin: '*',
  },
})
export class SocketGateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Socket;

  // constructor(private readonly socketService: SocketService) {}

  @SubscribeMessage('getRooms')
  handleConnection(socket: Socket): void {
    console.log('handleConnection gateway');

    socket.broadcast.emit('rooms', [1,2,3])
    
    // this.socketService.handleConnection(socket);
  }

  // Implement other Socket.IO event handlers and message handlers
}