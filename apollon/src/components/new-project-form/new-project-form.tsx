import { Button, Form, Input } from 'antd';
import React, { ReactElement } from 'react';

interface NewProjectFormProps {
  getFormFields(newProject: ProjectForm): void;
  showJoin(): void;
}

const NewProjectForm: React.FC<NewProjectFormProps> = ({
  getFormFields,
  showJoin,
}): ReactElement => {
  const handleFinish = (data: ProjectForm) => {
    getFormFields(data);
  };

  return (
    <Form layout="vertical" onFinish={handleFinish} colon>
      <Form.Item
        label="Project's name :"
        name="name"
        colon
        rules={[
          { required: true, message: "You need to enter a project's name" },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button htmlType="button" onClick={showJoin}>Join Project</Button>
        <Button type="primary" htmlType="submit">
          Create Project
        </Button>
      </Form.Item>
    </Form>
  );
};
export default NewProjectForm;
