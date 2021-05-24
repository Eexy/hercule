import React, { ReactElement } from 'react';
import { Col, Row } from 'antd';

interface ProjectAvatarProps {
  firstLetter: string;
}

const ProjectAvatar: React.FC<ProjectAvatarProps> = ({
  firstLetter,
}): ReactElement => (
  <div
    className="project-avatar"
    style={{
      height: 45,
      width: 45,
      background: 'blue',
      color: 'white',
      borderRadius: 3,
    }}
  >
    <Row align="middle" justify="center" style={{ height: '100%' }}>
      <Col>
        <span style={{ textTransform: 'uppercase' }}>{firstLetter}</span>
      </Col>
    </Row>
  </div>
);

export default ProjectAvatar;
