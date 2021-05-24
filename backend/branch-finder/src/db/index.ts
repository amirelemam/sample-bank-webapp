import mongoose from 'mongoose';
import logger from '../common/logger'

const connStr: string = process.env.DB_CONN_STR as string;

mongoose.connect(connStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
  useFindAndModify: false,
  useCreateIndex: true
});

mongoose.connection.on('connected', () => {
  logger.info('Connected to MongoDB');
  mongoose.set('returnOriginal', false);
});

mongoose.connection.on('err', (err) => {
  logger.error(`Mongoose connected error=${err}`);
});

mongoose.connection.on('disconnected', () => {
  logger.info('Mongoose disconnected');
});
