import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import DashboardSidebar from './sidebar/dashboard-sidebar';
import { ProjectContext } from '../../../../context/project-context';
import Screen from '../../../../components/screen';
import CommitsPanel from './commits/commits-panel';
import MessagesPanel from './messages/messages-panel';
import getUsers from '../../../../services/get-users';
import TodosPanel from './todo/todos-panel';

const switchRender = (panel: string): ReactElement => {
  switch (panel) {
    case 'commits':
      return <CommitsPanel />;
      break;
    case 'todos':
      return <TodosPanel />;
    case 'messages':
      return <MessagesPanel />;
      break;
    default:
      return <MessagesPanel />;
      break;
  }
};

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
          {switchRender(dashboardPanel)}
        </Col>
      </Row>
    </Screen>
  );
};

export default Dashboard;
