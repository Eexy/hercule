import React, { ReactElement, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../context/user-context';
import { ProjectContext } from '../../context/project-context';
import Sidebar from './parts/sidebar/sidebar';
import NewProjectModal from '../../components/new-project-modal/new-project-modal';
import './home.css';
import Dashboard from './parts/dashboard/dashboard';

const Home: React.FC = (): ReactElement => {
  const { project } = useContext(ProjectContext);
  const { user } = useContext(UserContext);
  const [isModalVisible, setIsModaleVisible] = useState(false);

  if (user.token === '') {
    return <Redirect to="/login" />;
  }

  return (
    <div className="home screen">
      <Sidebar showModal={setIsModaleVisible} isModalVisible={isModalVisible} />
      <main style={{ flex: 1, background: '#373a43' }}>
        <Dashboard />
      </main>
      <NewProjectModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModaleVisible}
      />
    </div>
  );
};

export default Home;
