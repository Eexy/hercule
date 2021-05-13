import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';

interface Payload {
  id: string;
  date: number;
}

const auth: RequestHandler = async (req, res, next): Promise<any> => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.send({err: 'User is not connected'});
  }

  const token: string = authorization.split(' ')[1];
  const decoded: Payload = jwt.verify(token, process.env.JWT_KEY!) as Payload;

  const user = await User.findById(decoded.id);

  if (!user) {
    return res.send({err: 'User is not connected'});
  }

  req.user = user;
  return next();
};

export default auth;
