import React, { ReactElement } from 'react';
import Chat from '../chat/chat';

interface ChatListProps {
  chats: IChat[];
}

const ChatList: React.FC<ChatListProps> = ({chats}): ReactElement => (
  <ul
    className="chats-list"
    style={{ margin: 0, padding: 0, listStyle: 'none', overflow: 'auto' }}
  >
    {
      chats.map((chat: IChat) => <Chat key={chat.id} chat={chat} />)
    }
  </ul>
);

export default ChatList;
