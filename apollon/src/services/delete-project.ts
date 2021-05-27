import axios from 'axios';

const deleteProject = async (id: string, token: string): Promise<any> => {
  try {
    const { data }: DeleteProjectResponse = await axios.delete(
      `/api/project/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.err) {
      throw new Error();
    }

    return id;
  } catch (e) {
    return null;
  }
};

export default deleteProject;
