import React, { ReactElement } from 'react';
import Message from './message';

interface MessagesProps {
  messages: Message[];
}

const Messages: React.FC<MessagesProps> = ({ messages }): ReactElement => (
  <div className="messages" style={{ flex: 1, overflow: 'auto', marginBottom: 16 }}>
    {messages.map((message) => (
      <Message key={message.id} message={message} />
    ))}
  </div>
);

export default Messages;
