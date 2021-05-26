import React, { ReactElement, useContext, useState, useEffect } from 'react';
import { Space } from 'antd';
import Panel from '../../../../../components/panel/panel';
import { UserContext } from '../../../../../context/user-context';
import { ProjectContext } from '../../../../../context/project-context';
import { ClientContext } from '../../../../../context/client-context';
import getMessages from '../../../../../services/get-messages';
import postMessage from '../../../../../services/new-message';
import Messages from './messages';
import MessageForm from './message-form';

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

  client.on('new message', (message: any) => {
    const newMessages = [...messages, message.message];
    setMessages(newMessages);
  });

  useEffect(() => {
    if (project.id !== '') {
      loadMessages();
    }
  }, [project]);

  const handleNewMessage = async (message: string) => {
    const newMessage = await postMessage(
      message,
      project.channelId,
      user.token
    );
    if (newMessage) {
      setMessages([...messages, newMessage]);

      client.emit('new message', {
        to: project.channelId,
        message: newMessage,
      });
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
        <Messages messages={messages} />
        <MessageForm newMessage={handleNewMessage} />
      </div>
    </Panel>
  );
};

export default MessagesPanel;
