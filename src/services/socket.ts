import { io } from 'socket.io-client';

const socket = io('YOUR_SERVER_URL', {
  transports: ['websocket'],
});

export default socket;