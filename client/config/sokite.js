import { io } from "socket.io-client";

const SOCKET_URL = "http://192.168.92.156:8009"; // Change to your backend URL

const socket = io(SOCKET_URL, {
    transports: ["websocket"], // Ensures compatibility with React Native
    forceNew: true,
    reconnectionAttempts: 5,
    timeout: 10000,
});

export default socket;
