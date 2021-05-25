import getUser from './get-user';

const notNull = (user: User | null): user is User => {
  if (user === null) return false;
  return true;
};

const getUsers = async (userId: string[]): Promise<User[]> => {
  const users = await Promise.all(userId.map((id: string) => getUser(id)));
  const filteredUser: User[] = users.filter(notNull);

  return filteredUser;
};

export default getUsers;
