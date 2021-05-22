import React, { ReactElement, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { ProjectContext } from '../../context/project-context';
import { UserContext } from '../../context/user-context';
import ChatForm from '../chat-form/chat-form';
import ChatList from '../chats-list/chats-list';

const ProjectChat: React.FC = (): ReactElement => {
  const { user } = useContext(UserContext);
  const { project } = useContext(ProjectContext);
  const [chats, setChats] = useState<IChat[]>([]);

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
      setChats(data.messages);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (project.id !== '') {
      getChat();
    }
  }, [project]);

  const newChat = async (message: string) => {
    try{
      const {data} = await axios.post(`/api/channel/${project.channelId}/message`, {
        message
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      setChats([...chats, data.message])
    }catch(e){
      console.log(e);
    }
  };

  return (
    <div
      className="project-chat"
      style={{
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%',
        flex: 1,
      }}
    >
      <ChatList chats={chats} />
      <ChatForm newChat={newChat} />
    </div>
  );
};

export default ProjectChat;
