import axios from 'axios';

const deleteTodo = async (
  token: string,
  id: string
): Promise<boolean | null> => {
  try {
    const { data } = await axios.delete(`/api/todo/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return true;
  } catch (e) {
    return null;
  }
};

export default deleteTodo;
