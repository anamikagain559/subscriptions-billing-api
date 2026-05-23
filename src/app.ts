import express, { Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import { errorHandler } from './middlewares/error';
import routes from './routes';
import { connectDB } from './config/db';
import { config } from './config';
import { logger } from './config/logger';

const app = express();

// Security HTTP headers
app.use(helmet());

// Parse json request body
app.use(express.json());

// Parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Enable cors
app.use(cors());

// HTTP request logger
if (config.env !== 'test') {
  app.use(morgan('dev'));
}

// v1 api routes
app.use('/api/v1', routes);

// Base route
app.get('/', (req: Request, res: Response) => {
  res.send('Subscription Billing API is running!');
});

// Error handling middleware
app.use(errorHandler);

// Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(config.port, () => {
    logger.info(`Server listening on port ${config.port}`);
  });
});

export default app;
