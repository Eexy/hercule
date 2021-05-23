import React, { ReactElement } from 'react';
import Message from '../message/messages';

interface MessagesListProps {
  messages: IChat[];
}

const MessagesList: React.FC<MessagesListProps> = ({
  messages,
}): ReactElement => (
  <ul
    className="messages-list"
    style={{ margin: 0, padding: 0, listStyle: 'none', overflow: 'auto' }}
  >
    {messages.map((chat: IChat) => (
      <Message key={chat.id} chat={chat} />
    ))}
  </ul>
);

export default MessagesList;
