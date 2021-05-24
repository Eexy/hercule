import React, { ReactElement, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Panel from '../../../../../components/shared-components/panel/panel';
import { UserContext } from '../../../../../context/user-context';
import { ProjectContext } from '../../../../../context/project-context';
import { ClientContext } from '../../../../../context/client-context';
import getMessages from '../../../../../services/get-messages';

const MessagesPanel: React.FC = (): ReactElement => {
  const { user } = useContext(UserContext);
  const { project } = useContext(ProjectContext);
  const { client } = useContext(ClientContext);
  const [messages, setMessages] = useState<Message[]>([]);

  const loadMessages = async () => {
    const newMessages = await getMessages(project.channelId, user.token);

    if (newMessages) {
      setMessages(newMessages);
    }
  };
  client.on('new message', () => loadMessages());

  useEffect(() => {
    if (project.id !== '') {
      loadMessages();
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
      <div
        style={{
          padding: 12,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* <MessagesList messages={messages} /> */}
        {/* <MessageForm newMessage={newMessage} /> */}
      </div>
    </Panel>
  );
};

export default MessagesPanel;
