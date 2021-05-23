import { Button, Form, Input, Row } from 'antd';
import React, { ReactElement } from 'react';

interface MessageFormProps {
  newMessage(message: string): void;
}

const MessageForm: React.FC<MessageFormProps> = ({
  newMessage,
}): ReactElement => {
  const handleFinish = (data: any) => {
    newMessage(data.message);
  };

  return (
    <div className="chat-form" style={{ marginTop: 'auto' }}>
      <Form layout="inline" onFinish={handleFinish} style={{ width: '100%' }}>
        <Row style={{ width: '100%' }}>
          <Form.Item
            name="message"
            style={{ flex: 1 }}
            rules={[{ required: true }]}
          >
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

export default MessageForm;
