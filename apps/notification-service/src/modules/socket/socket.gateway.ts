import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { SOCKET_CONSTANTS } from '@commons/utils/constants/socket.constant';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer()
  server: Server;

  emitToUser(userId: string, event: string, data: any) {
    this.server.emit(userId, event, data);
  }

  private users = new Map<string, string>();

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    if (!userId) {
      client.disconnect();
      return;
    }
    this.users.set(userId, client.id);
  }

  handleDisconnect(client: Socket) {
    for (const [userId, socketId] of this.users) {
      if (socketId === client.id) {
        this.users.delete(userId);
        break;
      }
    }
  }

  sendNotification(receiverId: string, data: any) {
    const socketId = this.users.get(receiverId);
    if (socketId) {
      this.server.to(socketId).emit(SOCKET_CONSTANTS.EVENT.NOTIFICATION, data);
    } else {
      console.log('User not found');
    }
  }
}
