import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class OrdersGateway {
  @WebSocketServer()
  server: Server;

  notifyOrderStatus(orderId: string, status: string) {
    this.server.emit(`orderStatus_${orderId}`, status);
  }

  @SubscribeMessage('joinOrder')
  handleJoinOrder(client, orderId: string) {
    client.join(`order_${orderId}`);
  }

  @SubscribeMessage('leaveOrder')
  handleLeaveOrder(client, orderId: string) {
    client.leave(`order_${orderId}`);
  }
}