# Real-time Chat Application

A modern real-time chat application built with Node.js and WebSocket technology. This application provides instant messaging capabilities with a clean and responsive user interface.

## Features

- Real-time bidirectional communication
- User join/leave notifications
- Clean and modern UI
- Connection status indicator
- Support for custom usernames
- Mobile-responsive design
- Low memory usage and fast message processing

## Technologies Used

- Node.js
- Express.js
- WebSocket (ws)
- HTML5
- CSS3
- JavaScript (ES6+)

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd NodeJS-milestone-5.1
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

1. Start the server:
```bash
npm start
```

2. For development with auto-reload:
```bash
npm run dev
```

3. Access the application:
- Open your browser and navigate to `http://localhost:3000`
- You can open multiple browser windows to test the chat functionality

## Usage

1. Enter your username (optional, defaults to "Anonymous")
2. Type your message in the input field
3. Press Enter or click the Send button to send messages
4. Messages will appear in real-time for all connected users

## Project Structure

```
NodeJS-milestone-5.1/
├── server.js           # Main server file with WebSocket implementation
├── package.json        # Project dependencies and scripts
├── public/
│   ├── index.html     # Main HTML file
│   ├── styles.css     # CSS styles
│   └── client.js      # Client-side WebSocket implementation
└── README.md          # Project documentation
```

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

Feel free to submit issues and enhancement requests.
