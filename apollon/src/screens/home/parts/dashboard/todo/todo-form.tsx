import { Button, Form, Input, Row } from 'antd';
import React, { ReactElement } from 'react';

interface TodoFormProps {
  newTodo(desc: string): void;
}

const TodoForm: React.FC<TodoFormProps> = ({ newTodo }): ReactElement => {
  const handleFinish = (data: any) => {
    newTodo(data.desc);
  };

  return (
    <div className="todo-form">
      <Form layout="inline" onFinish={handleFinish} style={{ width: '100%' }}>
        <Row style={{ width: '100%' }}>
          <Form.Item
            name="desc"
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

export default TodoForm;
