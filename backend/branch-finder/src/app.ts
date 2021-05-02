import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser'
import helmet from 'helmet'
import morgan from 'morgan'

import logger from './common/logger'
import routes from './routes';
import swaggerDocument from './docs/swagger';
import { NotFoundError, HttpException } from './common/errors'
import './db';

const app = express();

app.set('port', process.env.PORT || 4010)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/docs/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1/', routes);

/* istanbul ignore next */
// eslint-disable-next-line no-unused-vars
app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    logger.error(err.stack);

    if (!err.status) return res.status(500).json();
    return res.status(err.status).send({ error: err.message });
  }
  const { status, message } = NotFoundError();
  return res.status(status).send(message);
});

export default app
