import mongoose from 'mongoose';

const connStr: string = process.env.DB_CONN_STR || 'mongodb://localhost:27017/samplebank';

mongoose.connect(connStr, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
