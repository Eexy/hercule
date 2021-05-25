import React, { ReactElement } from 'react';

interface MessagesProps {
  messages: Message[];
}

const Messages: React.FC<MessagesProps> = ({ messages }): ReactElement => (
  <div />
);

export default Messages;
