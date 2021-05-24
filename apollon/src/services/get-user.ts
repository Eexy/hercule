import axios from 'axios';

const getUser = async (id: string): Promise<User | any> => {
  try {
    const { data } = await axios(`/user/${id}`);
    const user: User = {
      id: data.id,
      name: data.login,
      avatar: data.avatar_url,
    };
    return user;
  } catch (e) {
    return { err: e.message };
  }
};

export default getUser;
