import 'dotenv/config';
import './utils/connect';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import userRouter from './routers/user';
import projectRouter from './routers/project';
import channelRouter from './routers/channel';

const app = express();
const PORT = parseInt(process.env.PORT!, 10) || 3000;

app.use(helmet());
app.use(
  cors({
    origin: ['http://localhost:3000'],
  })
);
app.use(express.urlencoded());
app.use(express.json());
app.use(userRouter);
app.use(projectRouter);
app.use(channelRouter);

app.get('/', (_, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Listening port: ${PORT}`);
});
