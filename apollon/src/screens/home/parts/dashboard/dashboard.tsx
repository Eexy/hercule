import React, { ReactElement, useContext, useEffect, useState } from 'react';
import DashboardSidebar from '../../../../components/dashboard-sidebar/dashboard-sidebar';
import ProjectChat from '../../../../components/project-chat/project-chat';
import { ProjectContext } from '../../../../context/project-context';
import getUser from '../../../../utils/get-user';
import './dashboard.css';

const Dashboard: React.FC = (): ReactElement => {
  const { project } = useContext(ProjectContext);
  const [contributors, setContributors] = useState<User[]>([]);

  const getContributors = async () => {
    const newConstributors: User[] = await Promise.all(project.contributors.map((contributor: string) => 
      getUser(contributor)
    ));
    setContributors([...newConstributors]);
  };

  useEffect(() => {
    getContributors();
  }, [project]);

  return (
    <div className="dashboard">
      {project.id === '' ? null : (
        <DashboardSidebar contributors={contributors} />
      )}
      <ProjectChat />
    </div>
  );
};

export default Dashboard;
