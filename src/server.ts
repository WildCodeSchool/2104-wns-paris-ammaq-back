import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();
const PORT = 5000;

// Database connection
require('./database');

// Express config
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Handling HTTP errors
interface MongoError extends Error {
  code: number;
}

function isMongoError(error: Error): error is MongoError {
  return error.name === 'MongoError';
}

app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
  if (isMongoError(error)) {
    res.status(400);
    res.json({ success: false, message: 'An error occured' });
  }
});

// Define listening port
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});