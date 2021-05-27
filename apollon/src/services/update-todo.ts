import axios from 'axios';

const updateTodo = async (
  id: string,
  token: string,
  completed: boolean
): Promise<Todo | null> => {
  try {
    const { data }: TodoResponse = await axios.patch(
      `/api/todo/${id}`,
      {
        completed,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.err) {
      throw new Error();
    }

    return data.todo;
  } catch (e) {
    return null;
  }
};

export default updateTodo;
