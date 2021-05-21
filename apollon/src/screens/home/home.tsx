import axios from 'axios';
import React, { ReactElement, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../context/user-context';
import Sidebar from './parts/sidebar/sidebar';
import './home.css';

const Home: React.FC = (): ReactElement => {
  const { user } = useContext(UserContext);

  if (user.token === '') {
    return <Redirect to="/login" />;
  }

  const handleClick = async () => {
    try {
      const res = await axios.post(
        '/api/project/new',
        {
          name: 'test project',
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  const showUser = () => {
    console.log(user);
  };

  return (
    <div className="home screen">
      <Sidebar />
      <main>
        <button type="button" onClick={handleClick}>
          Create new project
        </button>
        <button type="button" onClick={showUser}>
          Show user
        </button>
      </main>
    </div>
  );
};

export default Home;
