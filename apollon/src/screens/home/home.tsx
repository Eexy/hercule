import React, { ReactElement, useContext } from 'react';
import { UserContext } from '../../context/user-context';

const Home: React.FC = (): ReactElement => {
  const {user} = useContext(UserContext);
  
  return <div className="home" />;
};

export default Home;
