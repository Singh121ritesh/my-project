import "dotenv/config";
import app from './src/app.js';
import connectDB from './src/config/database.js';
import http from "http";
import { initSocket } from "./src/sockets/server.socket.js";

const PORT = process.env.PORT || 3000;

const httpServer = http.createServer(app);

// YE LINE MISSING THI
initSocket(httpServer);

connectDB()
.catch((error) => {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
})
.then(() => {
    httpServer.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});