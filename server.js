import express from 'express';
import bodyParser from 'body-parser';
import userRouter from './routes/user-route';
import battleRouter from './routes/battle-route';
import {
  tokenMiddleware,
  verifyJWTMiddleware
} from './middlewares/token-middleware';
import { logErrors, clientErrorHandler } from './middlewares/error-handlers';

import {} from './db/mongoose';

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/user/', userRouter);
app.use('/api/', tokenMiddleware, verifyJWTMiddleware, battleRouter);

// error handlers
app.use(logErrors);

app.use(clientErrorHandler);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
