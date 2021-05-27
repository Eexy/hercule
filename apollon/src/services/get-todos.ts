import axios from 'axios';

const getTodos = async (
  project: string,
  token: string
): Promise<Todo[] | null> => {
  try {
    const { data }: TodosResponse = await axios.get(
      `/api/project/${project}/todos`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.err) {
      throw new Error();
    }

    return data.todos;
  } catch (e) {
    return null;
  }
};

export default getTodos;
