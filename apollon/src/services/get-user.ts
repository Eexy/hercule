import axios from 'axios';

const getUser = async (id: string): Promise<User | null> => {
  try {
    const { data } = await axios(`/user/${id}`);

    const user: User = {
      id: data.id,
      name: data.login,
      avatar: data.avatar_url,
    };
    return user;
  } catch (e) {
    return null;
  }
};

export default getUser;
