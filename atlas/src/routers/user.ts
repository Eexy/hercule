import express, { Router } from 'express';
import User from '../models/user';

const router: Router = express.Router();

router.post('/api/user/register', async (req, res) => {
  let user = null;
  try {
    user = new User({ ...req.body });
    await user.save();
  } catch (e) {
    if (e.code === 11000) {
      return res.send({ err: 'email already exist in the database' });
    }

    return res.send({ err: e.message });
  }

  return res.send(user);
});

router.post('/api/user/login', async (req, res) => {
  let user = null;
  try {
    user = await User.findByCredentials(req.body.email, req.body.password);
  } catch (e) {
    return res.send({ err: e.message });
  }

  return res.send(user);
});

export default router;
