import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import DashboardSidebar from './sidebar/dashboard-sidebar';
import { ProjectContext } from '../../../../context/project-context';
import Screen from '../../../../components/shared-components/screen';
import CommitsPanel from './commits/commits-panel';
import MessagesPanel from './messages/messages-panel';
import getUsers from '../../../../services/get-users';

const Dashboard: React.FC = (): ReactElement => {
  const { project } = useContext(ProjectContext);
  const [contributors, setContributors] = useState<User[]>([]);
  const [dashboardPanel, setDashboardPanel] = useState('messages');

  const getContributors = async () => {
    const newConstributors: User[] = await getUsers(project.contributors);
    setContributors(newConstributors);
  };

  useEffect(() => {
    getContributors();
  }, [project]);

  return (
    <Screen className="dashboard">
      <Row style={{ height: '100%' }}>
        {project.id === '' ? null : (
          <Col style={{ height: '100%' }}>
            <DashboardSidebar
              contributors={contributors}
              setPanel={setDashboardPanel}
            />
          </Col>
        )}
        <Col style={{ height: '100%', flex: 1 }}>
          {dashboardPanel === 'messages' ? <MessagesPanel /> : <CommitsPanel />}
        </Col>
      </Row>
    </Screen>
  );
};

export default Dashboard;
