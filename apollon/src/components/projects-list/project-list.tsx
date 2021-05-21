import React, { ReactElement, useContext } from 'react';
import { UserContext } from '../../context/user-context';

const ProjectsList: React.FC = (): ReactElement => {
  const { user } = useContext(UserContext);

  return (
    <ul className="project-list">
      <li className="project-list__item">Test</li>
    </ul>
  );
};

export default ProjectsList;
