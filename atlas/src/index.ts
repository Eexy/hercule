import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import userRouter from './routers/user';
import './utils/connect';

const app = express();
const PORT = parseInt(process.env.PORT!, 10) || 3000;

app.use(helmet());
app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use(userRouter);

app.get('/', (_, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log('Listening on port 3000');
});
