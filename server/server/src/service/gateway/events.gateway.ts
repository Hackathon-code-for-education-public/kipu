import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

const rooms = [
  {
      id: 1,
      name: 'Genel',
      description: 'Genel Sohbet Odası',
      users: [],
      status: 'open',
      hasPassword: false,
  },
  {
      id: 2,
      name: 'Vue.js',
      description: 'Vue.Js Sohbet Odası',
      users: [],
      status: 'open',
      hasPassword: true,
      password: '123'

  },
  {
      id: 3,
      name: 'React.js',
      description: 'React.Js Sohbet Odası',
      users: [],
      status: 'open',
      hasPassword: false,

  },
  {
      id: 4,
      name: 'Node.js',
      description: 'Node.Js Sohbet Odası',
      users: [],
      status: 'closed',
      hasPassword: false,
  }
];

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection {
  private readonly logger = new Logger(EventsGateway.name);
  @WebSocketServer()
  server: Server;

  handleConnection(socket: Socket): void {
    console.log('handleConnection gateway');
  }

  @SubscribeMessage('getRooms')
  findAll(): any {
    return {
      rooms
    }
  }
}
