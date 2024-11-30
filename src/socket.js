// src/socket.js
import { io } from 'socket.io-client';

// Initialize Socket.IO client with the server URL
const socket = io('http://localhost:3000'); // Update URL based on your server location

export default socket;
