import { Space } from 'antd';
import React, { ReactElement } from 'react';
import NewProjectBtn from './add-project/new-project-btn';
import ProjectsList from '../../../../components/project-list';

interface SidebarProps {
  isModalVisible: boolean;
  showModal(visible: boolean): void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isModalVisible,
  showModal,
}): ReactElement => (
  <div
    className="sidebar"
    style={{ padding: 12, height: '100%', borderRight: '1px solid #f0f0f0' }}
  >
    <Space direction="vertical" size="middle">
      <NewProjectBtn isModalVisible={isModalVisible} showModal={showModal} />
      <ProjectsList />
    </Space>
  </div>
);

export default Sidebar;
