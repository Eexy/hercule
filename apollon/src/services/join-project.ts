import axios from 'axios';

const joinProject = async (
  token: string,
  id: string
): Promise<Project | null> => {
  try {
    const { data }: ProjectResponse = await axios.post(
      `/api/project/${id}/join`,
      {},
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

export default joinProject;
