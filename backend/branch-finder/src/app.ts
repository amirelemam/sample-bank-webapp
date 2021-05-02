import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import routes from './routes';
import swaggerDocument from './docs/swagger';
import './db';

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private routes(): void {
    this.express.use('/api/docs/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    this.express.use('/api/v1/', routes);
  }
}

const PORT = process.env.PORT || 4010;

export default new App().express.listen(
  PORT,
  () => `Server running at ${PORT}`,
);
