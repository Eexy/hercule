import axios from 'axios';

const createProject = async (name: string, token: string): Promise<any> => {
  try {
    const { data } = await axios.post(
      '/api/project/new',
      {
        name,
      },
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

export default createProject;
