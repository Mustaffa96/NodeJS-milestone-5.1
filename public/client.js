// DOM Elements
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('message');
const usernameInput = document.getElementById('username');
const sendButton = document.getElementById('send');
const statusDiv = document.getElementById('status');

// WebSocket connection
const ws = new WebSocket(`ws://${window.location.host}`);

// Connection event handlers
ws.onopen = () => {
    statusDiv.textContent = 'Connected';
    statusDiv.style.color = 'green';
    enableInputs();
};

ws.onclose = () => {
    statusDiv.textContent = 'Disconnected';
    statusDiv.style.color = 'red';
    disableInputs();
};

// Message handler
ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    addMessage(data);
};

// UI Functions
function addMessage(data) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');

    if (data.type === 'info') {
        messageDiv.classList.add('info');
        messageDiv.textContent = data.message;
    } else {
        messageDiv.classList.add(data.sender === usernameInput.value ? 'sent' : 'received');
        messageDiv.textContent = `${data.sender}: ${data.message}`;
    }

    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function enableInputs() {
    messageInput.disabled = false;
    usernameInput.disabled = false;
    sendButton.disabled = false;
}

function disableInputs() {
    messageInput.disabled = true;
    usernameInput.disabled = true;
    sendButton.disabled = true;
}

// Event Listeners
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// Send Message Function
function sendMessage() {
    const message = messageInput.value.trim();
    const username = usernameInput.value.trim() || 'Anonymous';

    if (message && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
            message: message,
            sender: username
        }));
        messageInput.value = '';
    }
}

// Initial state
disableInputs();
