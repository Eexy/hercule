import express, { Router } from 'express';
import auth from '../middlewares/auth';
import Todo from '../models/todo';

const router: Router = express.Router();

router.get('/api/project/:id/todos', auth, async (req, res) => {
  try {
    const todos = await Todo.find({
      project: req.params.id,
    });

    if (!todos) {
      throw new Error('Unable to find todos');
    }
    const todosObj = todos.map((todo) => todo.toObject());
    return res.send({ ok: true, todos: todosObj });
  } catch (e) {
    return res.send({ ok: false, err: e.message });
  }
});

router.post('/api/project/:id/todo', auth, async (req, res) => {
  try {
    const todo = new Todo({
      desc: req.body.desc,
      project: req.params.id,
    });

    await todo.save();
    return res.send({ ok: true, todo: todo.toObject() });
  } catch (e) {
    return res.send({ ok: false, err: e.message });
  }
});

router.delete('/api/todo/:id', auth, async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    return res.send({ ok: true, message: 'Todo deleted' });
  } catch (e) {
    return res.send({ ok: false, err: 'Unable to delete todo' });
  }
});

router.patch('/api/todo/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      throw new Error('Unable to find todo to update');
    }

    if (req.body.completed !== undefined) {
      todo.completed = req.body.completed;
    }

    await todo.save();
    return res.send({ ok: true, todo });
  } catch (e) {
    return res.send({ ok: false, err: e.message });
  }
});

export default router;
