import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import DashboardSidebar from './dashboard-sidebar';
import MessagesPanel from './messages-panel';
import { ProjectContext } from '../context/project-context';
import getUser from '../utils/get-user';
import Screen from './shared-components/screen';

const Dashboard: React.FC = (): ReactElement => {
  const { project } = useContext(ProjectContext);
  const [contributors, setContributors] = useState<User[]>([]);

  const getContributors = async () => {
    const newConstributors: User[] = await Promise.all(
      project.contributors.map((contributor: string) => getUser(contributor))
    );
    setContributors([...newConstributors]);
  };

  useEffect(() => {
    getContributors();
  }, [project]);

  return (
    <Screen className="dashboard">
      <Row style={{ height: '100%' }}>
        {project.id === '' ? null : (
          <Col style={{ height: '100%' }}>
            <DashboardSidebar contributors={contributors} />
          </Col>
        )}
        <Col style={{ height: '100%', flex: 1 }}>
          <MessagesPanel />
        </Col>
      </Row>
    </Screen>
  );
};

export default Dashboard;
