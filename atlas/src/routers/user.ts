import express, { Router } from 'express';
import getAuthToken from '../utils/get-auth-token';
import getUser from '../utils/get-user';

const router: Router = express.Router();

router.post('/api/auth', async (req, res) => {
  const { code } = req.body;
  try {
    const token = await getAuthToken(code);
    const user = await getUser(token);
    return res.send({ ok: true, token, user });
  } catch (e) {
    return res.send({ ok: false, err: e.message });
  }
});

export default router;
