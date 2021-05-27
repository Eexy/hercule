import axios from 'axios';

const createTodo = async (
  id: string,
  token: string,
  desc: string
): Promise<Todo | null> => {
  try {
    const { data }: TodoResponse = await axios.post(
      `/api/project/${id}/todo`,
      {
        desc,
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

export default createTodo;
