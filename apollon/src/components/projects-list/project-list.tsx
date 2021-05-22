import React, { ReactElement, useContext } from 'react';
import { UserContext } from '../../context/user-context';
import ProjectBtn from '../project-btn/project-btn';
import './project-list.css';

const ProjectsList: React.FC = (): ReactElement => {
  const { user } = useContext(UserContext);

  return (
    <ul className="project-list">
      {
        user.projects.map((project: IProject) => <ProjectBtn key={project.id} project={project} />)
      }
    </ul>
  );
};

export default ProjectsList;
