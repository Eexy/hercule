import express, { Router } from 'express';
import Project from '../models/project';
import getAuthToken from '../utils/get-auth-token';
import getUser from '../utils/get-user';

const router: Router = express.Router();

router.post('/api/auth', async (req, res) => {
  const { code } = req.body;
  try {
    const token = await getAuthToken(code);
    const user = await getUser(token);
    const projects = await Project.find({contributors: user.id});
    return res.send({ ok: true, token, user, projects });
  } catch (e) {
    return res.send({ ok: false, err: e.message });
  }
});

export default router;
