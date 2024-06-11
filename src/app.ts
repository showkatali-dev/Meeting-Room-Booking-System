import express from 'express';
import cors from 'cors';
import router from './app/routes';

const app = express();

app.use([cors(), express.json(), express.urlencoded({ extended: true })]);

app.get('/health', (req, res) => {
  res.send({
    message: 'OK',
  });
});

app.use('/api', router);

export default app;
