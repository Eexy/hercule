import axios from 'axios';

const getCommit = async (
  repo: string,
  username: string
): Promise<Commit[] | null> => {
  try {
    const { data } = await axios.get(`/repos/${username}/${repo}/commits`);
    const commits: Commit[] = [];
    data.forEach((temp: any) => {
      const commit: Commit = {
        id: temp.node_id,
        message: temp.commit.message,
        user: {
          name: temp.author.login,
          id: temp.author.id,
          avatar: temp.author.avatar_url,
        },
      };
      commits.push(commit);
    });

    return commits;
  } catch (e) {
    return null;
  }
};

export default getCommit;
