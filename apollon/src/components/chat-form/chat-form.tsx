import { Button, Form, Input, Row } from 'antd';
import React, { ReactElement } from 'react';

interface ChatFormProps {
  newChat(message: string): void;
}

const ChatForm: React.FC<ChatFormProps> = ({newChat}): ReactElement => {
  const handleFinish = (data: any) => {
    newChat(data.message);
  };

  return (
    <div className="chat-form" style={{ marginTop: 'auto' }}>
      <Form layout="inline" onFinish={handleFinish} style={{width: '100%'}}>
        <Row style={{width: '100%'}}>
          <Form.Item name="message" style={{flex: 1}} rules={[{required: true}]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Send
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </div>
  );
};

export default ChatForm;
