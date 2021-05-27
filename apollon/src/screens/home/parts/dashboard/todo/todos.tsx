import React, { ReactElement } from 'react';
import Todo from './todo';

interface TodosProps {
  todos: Todo[];
  handleDeleteTodo(id: string): void;
  updateTodoStatus(id: string, completed: boolean): void;
}

const Todos: React.FC<TodosProps> = ({
  todos,
  handleDeleteTodo,
  updateTodoStatus,
}): ReactElement => (
  <div
    className="todos"
    style={{ flex: 1, overflow: 'auto', marginBottom: 16 }}
  >
    {todos.map((todo) => (
      <Todo
        key={todo.id}
        todo={todo}
        handleDeleteTodo={handleDeleteTodo}
        updateTodoStatus={updateTodoStatus}
      />
    ))}
  </div>
);

export default Todos;
