import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

const { MONGODB_URI, FRONTEND_URI, PORT } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: FRONTEND_URI }));
app.use(cookieParser());

import authRoutes from './routes/authRoutes.js';

app.use('/api/user', authRoutes);

app.listen(PORT, () => {
  console.log(`Listening to ${PORT}`);
});

mongoose.connect(MONGODB_URI).then(() => {
  console.log('connected to mongoDB...')
}).catch(err => {
  console.log("could not connect to Mongo", err);
});