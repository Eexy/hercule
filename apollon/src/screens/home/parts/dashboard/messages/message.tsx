import { Comment } from 'antd';
import React, { ReactElement } from 'react';
import UserAvatar from '../../../../../components/user-avatar';

interface MessageProps {
  message: Message;
}

const Message: React.FC<MessageProps> = ({ message }): ReactElement => (
  <Comment
    content={message.content}
    author={message.user.name}
    avatar={<UserAvatar user={message.user} />}
  />
);

export default Message;
