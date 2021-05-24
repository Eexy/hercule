import { Button, Form, Input } from 'antd';
import React, {ReactElement} from 'react';

interface JoinProjectFormProps{
  joinProjectField(id: string): void;
  showModal(isVisible: boolean): void;
}

const JoinProjectForm: React.FC<JoinProjectFormProps> = ({joinProjectField, showModal}): ReactElement => {
  const handleFinish = (data: any) => {
    joinProjectField(data.id);
    showModal(false);
  }

  return (
    <Form layout="vertical" onFinish={handleFinish}>
      <Form.Item
        label="Enter project id: "
        name="id"
        rules={[{required: true, message: 'Please enter a project id'}]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Join Project</Button>
      </Form.Item>
    </Form>
  )
}

export default JoinProjectForm;