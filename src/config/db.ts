import mongoose from 'mongoose';
import { config } from './index';
import { logger } from './logger';

export const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoose.url);
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error('Failed to connect to MongoDB', error);
    process.exit(1);
  }
};
