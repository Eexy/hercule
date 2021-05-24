import React, { ReactElement, useContext } from 'react';
import { UserContext } from '../context/user-context';
import ProjectBtn from './project-btn';

const ProjectsList: React.FC = (): ReactElement => {
  const { user } = useContext(UserContext);

  return (
    <div className="project-list">
      {user.projects.map((project: Project) => (
        <ProjectBtn key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectsList;
