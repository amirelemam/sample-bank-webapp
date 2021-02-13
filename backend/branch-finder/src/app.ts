import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import routes from './routes';

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();

    this.middlewares();
    this.database();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private database(): void {
    const connStr: string =
      process.env.DB_CONN_STR || 'mongodb://localhost:27017/samplebank';

    mongoose.connect(connStr, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  private routes(): void {
    this.express.use(routes);
  }
}

const PORT = process.env.PORT || 4010;

export default new App().express.listen(
  PORT,
  () => `Server running at ${PORT}`
);
