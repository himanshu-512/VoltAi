// config/socket.js
import { Server } from "socket.io";
const io = new Server({ cors: { origin: "*" } });
io.on("connection", (socket) => {
    console.log(`🟢 New client connected: ${socket.id}`);
    socket.on("disconnect", () => {
        console.log(`🔴 Client disconnected: ${socket.id}`);
    });
});
export default io;