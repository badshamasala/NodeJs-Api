import dotenv from "dotenv"
import express from 'express';
import bodyParser from 'body-parser';
import registerRoutes from './routes/register.js';
import loginRoutes from './routes/login.js';
import getUsersRoutes from './routes/getUsers.js';
import updateUsernameRoutes from './routes/updateUsername.js';
import updatePasswordRoutes from './routes/updatePassword.js';
import {connect} from "mongoose";
import setupSwagger from './swagger.js'
// import pg from 'pg';

// import WebSocket, { WebSocketServer } from 'ws';
dotenv.config()

const connectDB = (url) => {
  return connect(url, {
    useNewUrlParser: true,
  })
};

const app = express();
app.use(express.static('public'));

// const client = new pg.Client({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'postgres',
//   password: 'Aarashid@1',
//   port: 5432, // or the port that your PostgreSQL instance is using
// });

// client.connect().then(()=>{
//   console.log("Postgre Connected");
// })

app.use(express.json());
app.use('/register',registerRoutes);
app.use('/login',loginRoutes);
app.use('/users',getUsersRoutes);
app.use('/update/username',updateUsernameRoutes);
app.use('/update/password',updatePasswordRoutes);
setupSwagger(app)



// // Create a new WebSocket server
// const wss = new WebSocketServer({ port: 8080 });

// // Handle WebSocket connections
// wss.on('connection', (ws) => {
//   console.log('New client connected');
 
//   // Handle incoming messages
//   ws.on('message', (message) => {
//     console.log('Received message:', message);

//     // Broadcast the message to all clients
//     wss.clients.forEach((client) => {
//       if (client.readyState === WebSocket.OPEN) {
//         client.send(message);
//       }
//     });
//   });

//   // Handle disconnections
//   ws.on('close', () => {
//     console.log('Client disconnected');
//   });
// });





const PORT = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () =>
      console.log(`Server is listening on port ${PORT}...`),
     
    );
  } catch (error) {
    console.log("----------- error", error);
  }
};
start();
