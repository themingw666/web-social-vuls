import { WebSocketServer } from 'ws';
import {prisma} from "../config/prisma.js"
import cheerio  from "cheerio"
import {check_url_easy,check_url_standard} from "../helper/validate/validate-url.js"
const initWebsocket = () => {
    // Create a WebSocket server attached to the HTTP server
const wss = new WebSocketServer({ port:8080 });

const clients = {};

// Khi một client kết nối
wss.on('connection', (ws) => {

  // Lắng nghe tin nhắn từ client
  ws.on('message', async(message) => {
    const data = JSON.parse(message);
    // Xử lý đăng ký client với userid
    if (data.type === 'register') {
      const userId = data.userId;
      clients[userId] = ws;

      // Gửi phản hồi lại cho client
      ws.send(JSON.stringify({ type: 'registered', success: true, userId }));
    }

    // Xử lý các tin nhắn khác từ client
    else if (data.type === 'message') {
      // Xử lý tin nhắn hoặc chuyển tiếp tin nhắn đến client khác
     
      //handle type message 
       if(data.type_message == "url"){
        //check setting 
        const [setting] = await prisma.$queryRaw`Select status from vulnerable where name='SSRF'`
        //fetch header data 
        let url 
        if(setting.status === 'Easy'){
          url = check_url_easy(data.message) ? data.message : "https://khanhkma.000webhostapp.com/"    
      }else {
          url = check_url_standard(data.message)? data.message : "https://khanhkma.000webhostapp.com/"
      }
     try {
      const response = await fetch(url)
      const content  = await  response.text()
      const $ = cheerio.load(content);
      const title = $('title').text(); // Tiêu đề của trang
      const description = $('meta[name="description"]').attr('content'); // Mô tả của trang
      const imageUrl = $('meta[property="og:image"]').attr('content'); // URL ảnh đại diện
        data.message= `<div class='preview'>
      <a style="text-decoration: underline" href=${url}>${data.message}</a>
      <img src=${imageUrl} />
      <p>${description}</p>
      </div>`
     } catch (error) {
      data.message= `<div class='preview'>
      <a href=${data.message}>${data.message}</a>
      <p>${error}</p>
      </div>`
     }
    }
    ws.send(JSON.stringify({
      type: 'message',
      from :data.sender_id,
      message : data.message,
      to : data.revceiver_id
  }))
       //test3 
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
        delete clients[userId];
        break;
      }
    }
  });
});
}

export default initWebsocket