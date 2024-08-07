import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import eventRoutes from './routes/eventRoutes';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json()); 

app.use('/api', userRoutes);
app.use('/api', eventRoutes); 

mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });

export default app;
