import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongoDB.js';
import authRouter from './Routes/authRoutes.js'



const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({Credentials: true}));


// API endpoints
app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
