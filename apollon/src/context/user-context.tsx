import React, { createContext, ReactElement, useState } from 'react';

interface IUserContext {
  user: {
    token: string;
    user: any;
  }
  setUser: React.Dispatch<React.SetStateAction<IUserState>>;
}

export const UserContext = createContext<IUserContext>({
  user: {
    token: '',
    user: {},
  },
  setUser: () => {
    // doSomething
  },
});

interface UserProviderProps {
  children: React.ReactNode;
}

interface IUserState {
  token: string;
  user: any;
}

const UserProvider: React.FC<UserProviderProps> = ({
  children,
}): ReactElement => {
  const [user, setUser] = useState<IUserState>({
    token: '',
    user: {},
  });

  return (
    <UserContext.Provider value={{ user: {...user}, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
