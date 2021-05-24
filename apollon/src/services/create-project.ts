import axios from 'axios';

const createProject = async (
  name: string,
  token: string
): Promise<Project | null> => {
  try {
    const { data }: ProjectResponse = await axios.post(
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

    if (data.err) {
      throw new Error(data.err);
    }

    const { project } = data;
    return project;
  } catch (e) {
    return null;
  }
};

export default createProject;
