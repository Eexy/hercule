import { Button } from 'antd';
import React, { ReactElement, useContext } from 'react';
import { ClientContext } from '../context/client-context';
import { ProjectContext } from '../context/project-context';
import randomColor from '../utils/random-color';

interface ProjectIconProps {
  project: Project;
}

const ProjectBtn: React.FC<ProjectIconProps> = ({ project }): ReactElement => {
  const { setProject } = useContext(ProjectContext);
  const { client } = useContext(ClientContext);
  const background: string = randomColor();

  const handleClick = () => {
    setProject({ ...project });
    client.emit('join room', { room: project.channelId });
  };

  return (
    <Button
      className="sidebar__btn"
      style={{
        background,
        outline: 'none',
        border: 0,
        height: 45,
        width: 45,
      }}
      size="large"
      onClick={handleClick}
    >
      <span
        className="sidebar__btn__first-letter"
        style={{ color: 'white', textTransform: 'uppercase' }}
      >
        {project.name[0]}
      </span>
    </Button>
  );
};
export default ProjectBtn;
