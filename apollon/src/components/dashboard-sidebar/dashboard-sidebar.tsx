import React, { ReactElement, useContext } from 'react';
import { ProjectContext } from '../../context/project-context';
import ContributorsList from '../contributors-list/contributors-list';

interface DashboardSidebarProps {
  contributors: User[];
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({contributors}): ReactElement => {
  const { project } = useContext(ProjectContext);

  return (
    <div className="sidebar" style={{ paddingRight: 48 }}>
      <h1 className="project-title">{project.name}</h1>
      <ContributorsList contributors={contributors} />
    </div>
  );
};

export default DashboardSidebar;
