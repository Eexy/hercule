import axios from 'axios';

const joinProject = async (token: string, id: string): Promise<any> => {
  try {
    const { data } = await axios.post(
      `/api/project/${id}/join`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { project } = data;
    return project;
  } catch (e) {
    return e;
  }
};

export default joinProject;
