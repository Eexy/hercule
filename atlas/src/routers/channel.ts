import express, { Router } from 'express';
import auth from '../middlewares/auth';
import Channel from '../models/channel';

const router: Router = express.Router();

router.get('/api/channel/:channelId', auth, async (req, res) => {
  let channel = null;
  try{
    channel = await Channel.findById(req.params.channelId);

    if(!channel){
      throw new Error('Unable to find channel');
    }
  }catch(e){
    return res.send({ok: false, err: e.message});
  }

  return res.send({ok: true, channel});
});

export default router;