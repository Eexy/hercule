import React, { ReactElement, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../context/user-context';
import { ProjectContext } from '../../context/project-context';
import Sidebar from './parts/sidebar/sidebar';
import NewProjectModal from '../../components/new-project-modal/new-project-modal';
import './home.css';

const Home: React.FC = (): ReactElement => {
  const { project } = useContext(ProjectContext);
  const { user } = useContext(UserContext);
  const [isModalVisible, setIsModaleVisible] = useState(false);

  if (user.token === '') {
    return <Redirect to="/login" />;
  }

  const showUser = () => {
    console.log(project);
  };

  return (
    <div className="home screen">
      <Sidebar showModal={setIsModaleVisible} isModalVisible={isModalVisible} />
      <main style={{ flex: 1, padding: '0.8rem', background: '#373a43' }}>
        <button type="button" onClick={showUser}>
          Show user
        </button>
      </main>
      <NewProjectModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModaleVisible}
      />
    </div>
  );
};

export default Home;
