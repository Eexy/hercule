import React, { ReactElement, useContext } from 'react';
import { UserContext } from '../../context/user-context';
import ProjectBtn from '../project-btn/project-btn';

const ProjectsList: React.FC = (): ReactElement => {
  const { user } = useContext(UserContext);

  return (
    <ul className="project-list"
      style={{listStyle: 'none', margin: 0, padding: 0}}
    >
      {
        user.projects.map((project: IProject) => <ProjectBtn key={project.id} project={project} />)
      }
    </ul>
  );
};

export default ProjectsList;
