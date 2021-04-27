import { connect } from 'mongoose';

const dbUrl = 'mongodb://127.0.0.1:27017/workit';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  autoIndex: true,
};

export default async function connectDB() {
  try {
    await connect(dbUrl, options);
    console.log('Connected to database');
  } catch (err) {
    console.log(`Error during Database Connection : ${err}`);
  }
}
