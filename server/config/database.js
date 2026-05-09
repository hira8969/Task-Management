import mongoose from 'mongoose';
import { env } from './env.js';
import { logger } from '../utils/logger.js';

export async function connectDatabase() {
  mongoose.set('strictQuery', true);
  const connection = await mongoose.connect(env.mongoUri);
  logger.info(`MongoDB connected: ${connection.connection.host}`);
}
