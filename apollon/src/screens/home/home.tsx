import React, { ReactElement, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth-context';

const Home: React.FC = (): ReactElement => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Redirect to="/login" />;
  }

  return <div>Homepage</div>;
};

export default Home;
