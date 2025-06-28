import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import {Redis} from 'ioredis';

const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const redisCache = new Redis();
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  socket.on("setUserId", async (userId) => {
    await redisCache.set(userId, socket.id);
  })
});

app.post('/sendPayload' , async(req,res) => {
    console.log(req.body);
    const {userId, payload} = req.body;
    if(!userId || !payload) {
        res.status(400).send("Invalid request");
    }
    const socketId = await redisCache.get(userId);

    if(socketId) {
        io.to(socketId).emit('submissionPayloadResponse', payload);
        res.send("Payload sent successfully");
    } else{
        res.status(404).send("User not connected");
    }
    return true;
})

httpServer.listen(3005, () => {
    console.log(`Server up at 3005`);
});