import dotenv from 'dotenv';
import http from 'http';
import app from './app.js';
import { connectDatabase } from './config/database.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';
import { initializeSocket } from './sockets/index.js';

dotenv.config();

const server = http.createServer(app);
initializeSocket(server);

await connectDatabase();

server.listen(env.port, () => {
  logger.info(`API listening on port ${env.port}`);
});

process.on('unhandledRejection', (error) => {
  logger.error(error);
  server.close(() => process.exit(1));
});
