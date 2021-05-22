import React, { ReactElement, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../context/user-context';
import Sidebar from './parts/sidebar/sidebar';
import './home.css';
import NewProjectModal from '../../components/new-project-modal/new-project-modal';

const Home: React.FC = (): ReactElement => {
  const { user } = useContext(UserContext);
  const [isModalVisible, setIsModaleVisible] = useState(false);

  if (user.token === '') {
    return <Redirect to="/login" />;
  }

  const showUser = () => {
    console.log(user);
  };

  return (
    <div className="home screen">
      <Sidebar showModal={setIsModaleVisible} isModalVisible={isModalVisible}/>
      <main>
        <button type="button" onClick={showUser}>
          Show user
        </button>
      </main>
      <NewProjectModal isModalVisible={isModalVisible} setIsModalVisible={setIsModaleVisible}/>
    </div>
  );
};

export default Home;
