import 'reflect-metadata';
import connectDB from './config/database';
import initServer from './app';

connectDB();
initServer();
