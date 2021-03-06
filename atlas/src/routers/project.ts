import express, { Router } from 'express';
import Project from '../models/project';
import auth from '../middlewares/auth';
import createRepo from '../utils/create-repo';

const router: Router = express.Router();

router.post('/api/project/new', auth, async (req, res) => {
  try {
    const { id, url, repoName, ownerName } = await createRepo(
      req.oauthToken!,
      req.body.name
    );

    const project = new Project({
      name: req.body.name,
      owner: req.user.id,
      repoName,
      ownerName,
      githubId: id,
      githubUrl: url,
    });

    await project.save();
    return res.send({ ok: true, project });
  } catch (e) {
    return res.send({ ok: false, err: e.message });
  }
});

router.delete('/api/project/:id', auth, async (req, res) => {
  try {
    const project = await Project.findOne({
      owner: req.user.id,
      _id: req.params.id,
    });
    if (!project) {
      throw new Error('Unable to find project to delete');
    }

    await project.remove();
    return res.send({ ok: true, message: 'Project successfully deleted' });
  } catch (e) {
    return res.send({ ok: false, err: e.message });
  }
});

router.get('/api/project/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      throw new Error('Unable to find project');
    }
    return res.send({ ok: true, project });
  } catch (e) {
    return res.send({ ok: false, err: e.message });
  }
});

router.post('/api/project/:id/join', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      throw new Error('Unable to find project');
    }

    await project.addContributor(req.user.id);
    return res.send({ ok: true, project });
  } catch (e) {
    return res.send({ ok: false, err: e.message });
  }
});

router.post('/api/project/:id/leave', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      throw new Error('Unable to find project to leave');
    }

    await project.removeContributor(req.user.id);
    return res.send({ ok: true });
  } catch (e) {
    return res.send({ ok: false, err: e.message });
  }
});

export default router;
