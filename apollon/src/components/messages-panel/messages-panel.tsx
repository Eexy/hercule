import React, { ReactElement, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Panel from '../panel/panel';
import { UserContext } from '../../context/user-context';
import { ProjectContext } from '../../context/project-context';
import MessagesList from '../messages-list/messages-list';
import MessageForm from '../message-form/message-form';

const MessagesPanel: React.FC = (): ReactElement => {
  const { user } = useContext(UserContext);
  const { project } = useContext(ProjectContext);
  const [messages, setMessages] = useState<IChat[]>([]);

  const getChat = async () => {
    try {
      const { data } = await axios.get(
        `/api/channel/${project.channelId}/messages`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setMessages(data.messages);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (project.id !== '') {
      getChat();
    }
  }, [project]);

  const newMessage = async (message: string) => {
    try {
      const { data } = await axios.post(
        `/api/channel/${project.channelId}/message`,
        {
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setMessages([...messages, data.message]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Panel title="messages">
      <MessagesList messages={messages} />
      <MessageForm newMessage={newMessage} />
    </Panel>
  );
};

export default MessagesPanel;
