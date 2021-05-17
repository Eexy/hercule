import express, { Router } from 'express';
import Message from '../models/message';
import Channel from '../models/channel';
import auth from '../middlewares/auth';

const router: Router = express.Router();

router.get('/api/channel/:id', auth, async (req, res) => {
  let channel = null;

  try {
    channel = await Channel.findById(req.params.id);
    if (!channel) {
      throw new Error('Unable to find channel');
    }

    const isRecipient = channel.recipients.find(
      (recipient) => recipient.toString() === req.user.id
    );

    if (!isRecipient) {
      throw new Error('You are not allowed to access this channel');
    }

    await channel.populate({path: 'messages'}).execPopulate();
    console.log(channel.messages);
  } catch (e) {
    return res.send({ ok: false, err: e.message });
  }

  return res.send({ ok: true, channel });
});

export default router;
