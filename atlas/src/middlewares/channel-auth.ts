import { RequestHandler } from 'express';
import Channel from '../models/channel';

const channelAuth: RequestHandler = async (req, res, next): Promise<any> => {
  let channel = null;
  try{
    channel = await Channel.findById(req.params.id);
  }catch(e){
    return res.send({ok: false, err: 'Invalid channel\'s ID'});
  }

  if (!channel) {
    return res.send({ ok: false, err: 'Unable to find channel, Invalid ID' });
  }

  const { user } = req;
  const isRecipient = channel.recipients.find(
    (recipient) => recipient.toString() === user.id
  );

  if (!isRecipient) {
    return res.send({ok: false, err: 'You are not allowed to access this channel'});
  }

  req.channel = channel;
  return next();
};

export default channelAuth;
