import Title from 'antd/lib/typography/Title';
import { Button, Col, Row, Space } from 'antd';
import React, { ReactElement, useContext, useState } from 'react';
import { ShareAltOutlined } from '@ant-design/icons';
import { ProjectContext } from '../context/project-context';
import ContributorsList from './contributors-list';
import ProjectAvatar from './shared-components/project-avatar';
import ShareModal from './share-modal';

interface DashboardSidebarProps {
  contributors: User[];
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  contributors,
}): ReactElement => {
  const { project } = useContext(ProjectContext);
  const [isModalVisible, showModal] = useState(false);

  return (
    <div
      className="sidebar"
      style={{
        borderRight: '1px solid #f0f0f0',
        height: '100%',
        padding: 12,
        minWidth: 250,
      }}
    >
      <Space direction="vertical" size="large">
        <div className="sidebar__header">
          <Row align="middle">
            <Col>
              <ProjectAvatar firstLetter={project.name[0]} />
            </Col>
            <Col style={{ paddingLeft: 12 }}>
              <Title level={4} style={{ color: '#262626' }}>
                {project.name}
              </Title>
            </Col>
            <Col style={{ paddingLeft: 32 }}>
              <Button
                icon={<ShareAltOutlined />}
                onClick={() => showModal(true)}
              />
            </Col>
          </Row>
        </div>
        <ContributorsList contributors={contributors} />
      </Space>
      <ShareModal isVisible={isModalVisible} showModal={showModal} />
    </div>
  );
};

export default DashboardSidebar;
