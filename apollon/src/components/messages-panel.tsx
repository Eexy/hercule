import React, { ReactElement, useContext, useState, useEffect } from 'react';
import { Space } from 'antd';
import axios from 'axios';
import { UserContext } from '../context/user-context';
import { ProjectContext } from '../context/project-context';
import MessagesList from './messages-list';
import MessageForm from './message-form';
import { ClientContext } from '../context/client-context';
import Panel from './shared-components/panel/panel';

const MessagesPanel: React.FC = (): ReactElement => {
  const { user } = useContext(UserContext);
  const { project } = useContext(ProjectContext);
  const { client } = useContext(ClientContext);
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
      setMessages([...data.messages]);
    } catch (e) {
      console.log(e);
    }
  };
  client.on('new message', () => getChat());

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
      client.emit('new message', {
        to: project.channelId,
      });
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
