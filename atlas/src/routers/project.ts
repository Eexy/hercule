import express, { Router } from 'express';
import mongoose from 'mongoose';
import Project from '../models/project';
import auth from '../middlewares/auth';

const router: Router = express.Router();

router.post('/api/project/new', auth, async (req, res) => {
  let project = null;
  const { user } = req;
  try {
    project = new Project({
      name: req.body.name,
      owner: req.user.id,
    });

    user.addProject(mongoose.Types.ObjectId(project.id));
    await project.save();
  } catch (e) {
    return res.send({ ok: false, err: 'Unable to create project' });
  }

  return res.send({ ok: true, project });
});

router.delete('/api/project/:id', auth, async (req, res) => {
  try {
    await Project.findAndDelete(req.params.id, req.user.id);
  } catch (e) {
    return res.send({ ok: false, err: e.message });
  }

  return res.send({ ok: true, message: 'Project successfully deleted' });
});

router.get('/api/project/:id', async (req, res) => {
  let project = null;
  try {
    project = await Project.findById(req.params.id);

    if (!project) {
      throw new Error('Unable to find project');
    }
  } catch (e) {
    return res.send({ ok: false, err: e.message });
  }

  return res.send({ ok: true, project });
});

router.post('/api/project/:id/join', auth, async (req, res) => {
  const { user } = req;
  let project = null;
  try {
    project = await Project.findById(req.params.id);

    if (!project) {
      throw new Error('Unable to find project');
    }

    await project.addContributor(user.id);
    await user.addProject(mongoose.Types.ObjectId(project.id));
  } catch (e) {
    return res.send({ ok: false, err: e.message });
  }

  return res.send({ ok: true, project });
});

router.post('/api/project/:id/leave', auth, async (req, res) => {
  const { user } = req;
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      throw new Error('Unable to find project to leave');
    }

    await project.removeContributor(user.id);
    await user.removeProject(req.params.id);
  } catch (e) {
    return res.send({ ok: false, err: e.message });
  }

  return res.send({ ok: true, user: user.toJSON() });
});

export default router;
