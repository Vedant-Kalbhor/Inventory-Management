require('dotenv').config();
require('express-async-errors');

const http=require('http');
const app =require('./server');
const { connectDB } =require('./config/db');

const PORT = process.env.PORT || 5000;

(async () => {
    try {
        console.log("Starting server...");
        await connectDB(process.env.MONGO_URI);
        console.log("Connected to DB");

        const server = http.createServer(app);
        console.log("HTTP server created");

        // Comment out temporarily if unsure
        require('./sockets').attach(server);
        console.log("Sockets attached");

        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
})();

