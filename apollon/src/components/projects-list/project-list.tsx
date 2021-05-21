import React, { ReactElement, useContext } from 'react';
import { UserContext } from '../../context/user-context';
import ProjectIcon from '../project-icon/project-icon';
import './project-list.css';

const ProjectsList: React.FC = (): ReactElement => {
  const { user } = useContext(UserContext);

  return (
    <ul className="project-list">
      {
        user.projects.map((project: IProject) => <ProjectIcon key={project.id} project={project} />)
      }
    </ul>
  );
};

export default ProjectsList;
