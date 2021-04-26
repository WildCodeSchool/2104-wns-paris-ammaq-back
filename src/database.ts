import mongoose from 'mongoose';

const dbUrl = 'mongodb://127.0.0.1:27017/wilderdb';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  autoIndex: true,
};

mongoose.connect(dbUrl, options);

mongoose.connection.on('connected', () => {
  console.log('Connected to database');
});

mongoose.connection.on('error', (err) => {
  console.log(`Error during Database Connection : ${err}`);
});