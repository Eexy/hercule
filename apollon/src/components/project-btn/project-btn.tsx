import React, { ReactElement } from 'react';
// import './project-btn.css';

interface ProjectIconProps {
  project: IProject;
}

const ProjectBtn: React.FC<ProjectIconProps> = ({ project }): ReactElement => {
  const handleClick = () => {
    console.log(project);
  }
  
  return (
    <button className="sidebar__btn" type="button" onClick={handleClick}>
      <span className="sidebar__btn__first-letter">{project.name[0]}</span>
    </button>
  );
};
export default ProjectBtn;
