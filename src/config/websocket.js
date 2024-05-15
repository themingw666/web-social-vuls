import { WebSocketServer } from 'ws';
import {prisma} from "../config/prisma.js"

const initWebsocket = () => {
    // Create a WebSocket server attached to the HTTP server
const wss = new WebSocketServer({ port:8080 });

const clients = {};

// Khi một client kết nối
wss.on('connection', (ws) => {
  console.log('A client connected');

  // Lắng nghe tin nhắn từ client
  ws.on('message', async(message) => {
    const data = JSON.parse(message);

    // Xử lý đăng ký client với userid
    if (data.type === 'register') {
      const userId = data.userId;
      clients[userId] = ws;
      console.log(`Client registered with ID: ${userId}`);

      // Gửi phản hồi lại cho client
      ws.send(JSON.stringify({ type: 'registered', success: true, userId }));
    }

    // Xử lý các tin nhắn khác từ client
    else if (data.type === 'message') {
      console.log(`Message from ${data.sender_id}: ${data.message}`);
      // Xử lý tin nhắn hoặc chuyển tiếp tin nhắn đến client khác
      //process db 
      try {
        const message = await prisma.message.create({
            data: { userSender_id: data.sender_id , userRecipient_id : Number(data.revceiver_id), content : data.message, type :"text" },
          })
      } catch (error) {
        ws.send(JSON.stringify({ error: error}));
      }
      //forward client 
       const ReceivedUser = clients[data.revceiver_id]
      if(ReceivedUser != undefined){
         ReceivedUser.send(JSON.stringify(
            {
                type: 'message',
                from :data.sender_id,
                message : data.message
            }
         ))
      }
    }
  });

  // Xử lý ngắt kết nối
  ws.on('close', () => {
    for (const userId in clients) {
      if (clients[userId] === ws) {
        console.log(`Client disconnected: ${userId}`);
        delete clients[userId];
        break;
      }
    }
  });
});
}

export default initWebsocket