import React, { ReactElement, useContext, useState, useEffect } from 'react';
import Panel from '../../../../../components/panel/panel';
import { ProjectContext } from '../../../../../context/project-context';
import { UserContext } from '../../../../../context/user-context';
import createTodo from '../../../../../services/create-todo';
import deleteTodo from '../../../../../services/delete-todo';
import getTodos from '../../../../../services/get-todos';
import updateTodo from '../../../../../services/update-todo';
import TodoForm from './todo-form';
import Todos from './todos';

const TodosPanel: React.FC = (): ReactElement => {
  const { project } = useContext(ProjectContext);
  const { user } = useContext(UserContext);
  const [todos, setTodos] = useState<Todo[]>([]);

  const loadTodos = async () => {
    const todoLoaded = await getTodos(project.id, user.token);

    if (todoLoaded) {
      setTodos(todoLoaded);
    }
  };

  useEffect(() => {
    if (project.id !== '') {
      loadTodos();
    }
  }, [project]);

  const handleNewTodo = async (desc: string) => {
    const newTodo = await createTodo(project.id, user.token, desc);

    if (newTodo) {
      setTodos([...todos, newTodo]);
    }
  };

  const updateTodoStatus = async (id: string, completed: boolean) => {
    const updateTodos = todos.map((todo) => {
      if (todo.id === id) {
        // eslint-disable-next-line no-param-reassign
        todo.completed = completed;
      }

      return todo;
    });
    const res = await updateTodo(id, user.token, completed);

    if (res) {
      setTodos(updateTodos);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
    await deleteTodo(user.token, id);
  };

  return (
    <Panel title="todos">
      <div
        style={{
          padding: 12,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Todos todos={todos} handleDeleteTodo={handleDeleteTodo} updateTodoStatus={updateTodoStatus}/>
        <TodoForm newTodo={handleNewTodo} />
      </div>
    </Panel>
  );
};

export default TodosPanel;
