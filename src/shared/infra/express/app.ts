import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../../swagger.json';

import handleError from './middleware/handleError';
import '@shared/container';
import { router } from './routes';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1', router);

app.use(handleError);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export { app };
