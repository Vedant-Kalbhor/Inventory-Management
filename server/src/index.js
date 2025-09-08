//index.js => imports the app and starts listening on a port.
require('dotenv').config();
require('express-async-errors');

const http=require('http');
const app =require('./server');
const { connectDB } =require('./config/db');

const PORT = process.env.PORT || 5000;

(async ()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        const server=http.createServer(app);

        require('./sockets').attach(server);

        server.listen(PORT,()=>{
            console.log(`Server is running on port ${PORT}`);
        });
    }catch(err){
        console.error('Failed to start server:', err);
        process.exit(1);
    }
})
