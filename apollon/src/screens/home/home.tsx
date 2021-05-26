import React, { ReactElement, useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Col, Row } from 'antd';
import Sidebar from './parts/sidebar/sidebar';
import { UserContext } from '../../context/user-context';
import Dashboard from './parts/dashboard/dashboard';
import NewProjectModal from './parts/sidebar/add-project/new-project-modal';
import Screen from '../../components/screen';

const Home: React.FC = (): ReactElement => {
  const { user } = useContext(UserContext);
  const [isModalVisible, setIsModaleVisible] = useState(false);

  if (user.token === '') {
    return <Redirect to="/login" />;
  }

  return (
    <Screen className="home">
      <Row style={{ height: '100%' }}>
        <Col style={{ height: '100%' }}>
          <Sidebar
            showModal={setIsModaleVisible}
            isModalVisible={isModalVisible}
          />
        </Col>
        <Col flex="auto" style={{ height: '100%' }}>
          <Dashboard />
        </Col>
      </Row>
      <NewProjectModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModaleVisible}
      />
    </Screen>
  );
};

export default Home;
