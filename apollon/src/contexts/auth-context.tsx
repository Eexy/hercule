import React, { createContext, ReactElement, useState } from 'react';

interface ContextProps {
  user: User | null;
  setUser(user: any): void;
}

export const AuthContext = createContext<ContextProps>({
  user: null,
  setUser: () => {
    // do something
  },
});

const AuthProvider: React.FC = ({ children }): ReactElement => {
  const [user, setUser] = useState({
    id: '',
    email: '',
    token: '',
    projects: [],
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
