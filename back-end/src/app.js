import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import chatRouter from './routes/chat.routes.js';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:5173', // Front-end URL
  credentials: true, // Allow cookies to be sent
}));
// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'PP Chat App Server Running!' });
});
// Routes
app.use('/api/auth', authRouter);
app.use('/api/chat', chatRouter);


export default app;
