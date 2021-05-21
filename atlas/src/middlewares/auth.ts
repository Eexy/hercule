import { RequestHandler } from 'express';
import getUser from '../utils/get-user';

const auth: RequestHandler = async (req, res, next): Promise<any> => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.send({ ok: false, err: 'User is not connected' });
  }

  const token: string = authorization.split(' ')[1];

  try {
    const user = await getUser(token);

    if (!user) {
      return res.send({ ok: false, err: 'User is not connected' });
    }

    req.user = user;
    req.oauthToken = token;
    return next();
  } catch (e) {
    return res.send({ ok: false, err: 'invalid token' });
  }
};

export default auth;
