import { Logger } from '@nestjs/common';
import {
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
import { AppService } from './app.service';

@WebSocketGateway({ namespace: 'notification' })
export class NotificationGateWay implements OnGatewayInit {
  private readonly logger = new Logger(NotificationGateWay.name);
  constructor(private readonly service: AppService) {}

  @WebSocketServer() io: Namespace;

  afterInit(): void {
    this.logger.log(`WebSocket Gateway initializated.`);
  }

  handleConnection(client: Socket) {
    const sockets = this.io.sockets;

    this.logger.log(`WS Client with id: ${client.id} connected!`);
    this.logger.debug(`Number of connecting sockets: ${sockets.size}`);

    this.io.emit('hello', `from ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log('CLIENT', client);

    const sockets = this.io.sockets;

    this.logger.log(`Disconnected socket id ${client.id}`);
    this.logger.debug(`Number of connecting sockets: ${sockets.size}`);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    // this.server.emit('message', message);
  }
}
