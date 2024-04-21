import { SocketGateway } from '../service/gateway/socket.gateway';
import { Module } from '@nestjs/common';

@Module({
  providers: [SocketGateway],
})
export class SocketModule {}