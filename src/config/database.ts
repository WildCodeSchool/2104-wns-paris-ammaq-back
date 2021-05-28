import { connect } from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/workit';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  autoIndex: true,
};

export default async function connectDB(): Promise<void> {
  try {
    await connect(dbUrl, options);
    // eslint-disable-next-line no-console
    console.log('Connected to database');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(`Error during Database Connection : ${err}`);
  }
}
