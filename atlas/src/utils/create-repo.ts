import axios from 'axios';

const createRepo = async (token: string, name: string): Promise<any> => {
  try {
    const { data } = await axios.post(
      'https://api.github.com/user/repos',
      {
        name,
      },
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );

    return { id: data.node_id, url: data.clone_url, repoName: data.name, ownerName: data.owner.login };
  } catch (e) {
    throw new Error('Unable to create Repo');
  }
};

export default createRepo;
