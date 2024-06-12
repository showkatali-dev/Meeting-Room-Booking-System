import express from 'express';
import cors from 'cors';
import router from './app/routes';
import { notFoundHandler } from './app/middlewares/not-found-route-handler';
import { globalErrorHandler } from './app/middlewares/global-error-handler';

const app = express();

app.use([cors(), express.json(), express.urlencoded({ extended: true })]);

app.get('/health', (req, res) => {
  res.send({
    message: 'OK',
  });
});

app.use('/api', router);

app.use([notFoundHandler, globalErrorHandler]);

export default app;
