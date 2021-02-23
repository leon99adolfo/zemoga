import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process
  throw new Error("Couldn't find .env file");
}

// defining port
const port: number = parseInt(<string> process.env.PORT, 10) || 3200;

export default {
  port: port,
  // API configs
  api: { prefix: '/api' },
  // Used by winston logger
  logs: { level: process.env.LOG_LEVEL || 'silly' },
};
