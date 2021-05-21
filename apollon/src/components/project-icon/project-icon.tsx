import React, { ReactElement } from 'react';
import './project-icon.css';

interface ProjectIconProps {
  project: IProject;
}

const ProjectIcon: React.FC<ProjectIconProps> = ({ project }): ReactElement => {
  const handleClick = () => {
    console.log(project);
  }
  
  return (
    <button className="project-icon" type="button" onClick={handleClick}>
      <span className="project-icon__first-letter">{project.name[0]}</span>
    </button>
  );
};
export default ProjectIcon;
