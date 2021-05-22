import { Button } from 'antd';
import React, { ReactElement, useContext} from 'react';
import { ProjectContext } from '../../context/project-context';
import randomColor from '../../utils/random-color';

interface ProjectIconProps {
  project: IProject;
}

const ProjectBtn: React.FC<ProjectIconProps> = ({ project }): ReactElement => {
  const {setProject} = useContext(ProjectContext);
  const background: string = randomColor();

  const handleClick = () => {
    setProject({...project});
  };

  return (
    <li className="project-list__item">
      <Button
        className="sidebar__btn"
        style={{
          height: 45,
          width: 45,
          background,
          outline: 'none',
          border: 0,
        }}
        onClick={handleClick}
      >
        <span
          className="sidebar__btn__first-letter"
          style={{ color: 'white', textTransform: 'uppercase' }}
        >
          {project.name[0]}
        </span>
      </Button>
    </li>
  );
};
export default ProjectBtn;
