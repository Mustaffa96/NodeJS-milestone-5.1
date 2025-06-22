const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Store connected clients with minimal memory usage
const clients = new Set();

// WebSocket connection handling
wss.on('connection', (ws) => {
    // Add new client to the set
    clients.add(ws);
    
    // Send welcome message
    ws.send(JSON.stringify({
        type: 'info',
        message: 'Welcome to the chat!'
    }));

    // Broadcast to all clients that a new user joined
    broadcast({
        type: 'info',
        message: 'A new user joined the chat',
        users: clients.size
    });

    // Handle incoming messages
    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);
            // Broadcast the message to all connected clients
            broadcast({
                type: 'message',
                message: data.message,
                sender: data.sender
            });
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    });

    // Handle client disconnection
    ws.on('close', () => {
        clients.delete(ws);
        broadcast({
            type: 'info',
            message: 'A user left the chat',
            users: clients.size
        });
    });
});

// Efficient broadcasting function
function broadcast(message) {
    const messageStr = JSON.stringify(message);
    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(messageStr);
        }
    });
}

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
