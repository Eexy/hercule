import express, { Router } from 'express';
import auth from '../middlewares/auth';
import User, { UserDocument } from '../models/user';
import generateAuthToken from '../utils/generate-auth-token';

const router: Router = express.Router();

router.post('/api/user/register', async (req, res) => {
  let user = null;
  let token = '';

  try {
    user = new User({ ...req.body });
    token = generateAuthToken(user.id);
    await user.save();
  } catch (e) {
    if (e.code === 11000) {
      return res.send({
        ok: false,
        err: 'email already exist in the database',
      });
    }

    return res.send({ ok: false, err: e.message });
  }

  return res.send({ ok: true, token });
});

router.post('/api/user/login', async (req, res) => {
  let user = null;
  let token = '';
  try {
    user = await User.findByCredentials(req.body.email, req.body.password);
    token = generateAuthToken(user.id);
  } catch (e) {
    return res.send({ ok: false, err: e.message });
  }

  return res.send({ ok: true, token });
});

router.get('/api/user/me', auth, (req, res) => {
  res.send(req.user.toJSON());
});

router.get('/api/user/:id', async (req, res) => {
  let user: UserDocument | null = null;
  try {
    user = await User.findById(req.params.id);

    if (!user) {
      throw new Error('Unable to find user');
    }
  } catch (e) {
    return res.send({ err: 'Unable to find user' });
  }
  return res.send(user);
});

router.delete('/api/user/me', auth, async (req, res) => {
  const { user } = req;
  try {
    await User.findByIdAndDelete(user.id);
  } catch (e) {
    return res.send({ err: 'Unable to delete user' });
  }

  return res.send('User successfully deleted');
});

export default router;
