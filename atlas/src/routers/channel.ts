import express, { Router } from 'express';
import auth from '../middlewares/auth';
import channelAuth from '../middlewares/channel-auth';
import Message from '../models/message';

const router: Router = express.Router();

router.get('/api/channel/:id', auth, channelAuth, async (req, res) =>
  res.send({ ok: true, channel: req.channel })
);

router.get('/api/channel/:id/messages', auth, channelAuth, async (req, res) => {
  const { channel } = req;

  try {
    await channel.populate({ path: 'messages' }).execPopulate();
  } catch (e) {
    return res.send({ ok: false, err: e.message });
  }

  return res.send({ ok: true, messages: channel.messages });
});

router.post('/api/channel/:id/message', auth, channelAuth, async (req, res) => {
  const { channel, user } = req;
  let message = null;
  try {
    message = new Message({
      senderId: user.id,
      channelId: channel.id,
      content: req.body.message,
    });
    await message.save();
  } catch (e) {
    return res.send({ ok: false, err: e.message });
  }

  return res.send({ ok: true, message });
});

export default router;
