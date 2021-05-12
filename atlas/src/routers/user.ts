import express, { Router } from 'express';
import User from '../models/user';

const router: Router = express.Router();

router.post('/api/user/register', async (req, res) => {
  try {
    const user = new User({ ...req.body });
    await user.save();
  } catch (e) {
    if (e.code === 11000) {
      return res.send({ err: 'email already exist in the database' });
    }
    if (e.message.includes('Invalid email format')) {
      return res.send({ err: 'Invalid email format' });
    }
    return res.send(e);
  }
  return res.send('user created');
});

export default router;
