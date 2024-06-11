import express from 'express';
import cors from 'cors';

const app = express();

app.use([cors(), express.json(), express.urlencoded({ extended: true })]);

app.get('/health', (req, res) => {
  res.send({
    message: 'OK',
  });
});

export default app;
