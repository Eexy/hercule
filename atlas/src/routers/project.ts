import express, { Router } from 'express';
import auth from '../middlewares/auth';
import Project from '../models/project';

const router: Router = express.Router();

router.post('/api/project/new', auth, async (req, res) => {
  let project = null;
  const { user } = req;
  try {
    project = new Project({ name: req.body.name, owner: req.user.id });
    user.projects.push(project.id);
    await user.save();

    project.contributors.push(user.id);
    await project.save();
  } catch (e) {
    console.log(e);
    return res.send({ ok: false, err: 'Unable to create project' });
  }

  return res.send({ ok: true, project });
});

router.delete('/api/project/:id', auth, async (req, res) => {
  let project = null;
  try {
    project = await Project.findById(req.params.id);

    if (project?.owner !== req.user.id) {
      throw new Error('You are not allowed to delete the project');
    }
  } catch (e) {
    return res.send({ ok: false, err: e.message });
  }

  await project?.remove();
  return res.send({ ok: true, message: 'Project successfully deleted' });
});

router.post('/api/project/:id/join', auth, async (req, res) => {
  const { user } = req;
  let project = null;
  try {
    project = await Project.findById(req.params.id);

    if (!project) {
      throw new Error('Unable to find project');
    }

    const isContributor = project.contributors.find(
      (contributor) => contributor.toString() === user.id
    );

    if (isContributor) {
      throw new Error("You can't join a project you have already join");
    }

    user.projects.push(req.params.id);
    await user.save();

    project.contributors.push(user.id);
    await project.save();
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

    project.contributors = project.contributors.filter(
      (contributor) => contributor.toString() !== user.id
    );
    
    await project.save();

    user.projects = user.projects.filter(
      (proj: string) => proj.toString() !== project.id
    );
    await user.save();
  } catch (e) {
    return res.send({ ok: false, err: e.message });
  }

  return res.send({ ok: true, user: user.toJSON() });
});

export default router;
