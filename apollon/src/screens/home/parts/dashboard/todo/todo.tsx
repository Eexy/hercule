import React, { ReactElement, useState } from 'react';
import { Card, Row, Col, Button, Checkbox } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface TodoProps {
  todo: Todo;
  handleDeleteTodo(id: string): void;
  updateTodoStatus(id: string, completed: boolean): void;
}

const Todo: React.FC<TodoProps> = ({
  todo,
  handleDeleteTodo,
  updateTodoStatus,
}): ReactElement => {
  const [isCompleted, setIsCompleted] = useState(todo.completed);

  const handleChange = () => {
    setIsCompleted(!todo.completed);
    updateTodoStatus(todo.id, !todo.completed);
  };

  const handleDeleteButton = () => {
    handleDeleteTodo(todo.id);
  };

  return (
    <div className="todo" style={{ paddingBottom: '1rem' }}>
      <Card>
        <Row align="middle" justify="space-between">
          <Col>
            <Checkbox checked={isCompleted} onClick={handleChange} />
            <span style={{ paddingLeft: '1rem' }}>{todo.desc}</span>
          </Col>
          <Col>
            <Button danger onClick={handleDeleteButton}>
              <DeleteOutlined />
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Todo;
