import React, { createContext, ReactElement, useState } from 'react';

interface IUserContext {
  user: {
    token: string;
    user: any;
    projects: IProject[];
  };
  setUser: React.Dispatch<React.SetStateAction<IUserState>>;
}

export const UserContext = createContext<IUserContext>({
  user: {
    token: '',
    user: {},
    projects: [],
  },
  setUser: () => {
    // doSomething
  },
});

interface UserProviderProps {
  children: React.ReactNode;
}

interface IProject {
  id: string;
  owner: string;
  contributors: string[];
}

interface IUserState {
  token: string;
  user: any;
  projects: IProject[];
}

const UserProvider: React.FC<UserProviderProps> = ({
  children,
}): ReactElement => {
  const [user, setUser] = useState<IUserState>({
    token: '',
    user: {},
    projects: [],
  });

  return (
    <UserContext.Provider value={{ user: { ...user }, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
