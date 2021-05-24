import React, { ReactElement, useEffect, useState } from 'react';
import { Col, Image, Row } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import getUser from '../utils/get-user';

interface Message {
  chat: IChat;
}

const Message: React.FC<Message> = ({ chat }): ReactElement | null => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const temp = await getUser(chat.senderId);
        setUser(temp);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [user]);

  if (user === null) {
    return null;
  }

  return (
    <div className="chat" style={{ paddingBottom: 16 }}>
      <Row align="middle">
        <Col>
          <Avatar
            shape="circle"
            size={40}
            src={<Image src={user?.avatar} preview={false} />}
          />
        </Col>
        <Col style={{ paddingLeft: 16 }}>
          <p className="chat-content" style={{ margin: 0 }}>
            {chat.content}
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default Message;
