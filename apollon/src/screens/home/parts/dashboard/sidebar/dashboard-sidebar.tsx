import Title from 'antd/lib/typography/Title';
import { Button, Col, Menu, Row, Space } from 'antd';
import React, { ReactElement, useContext, useState } from 'react';
import {
  BranchesOutlined,
  CheckSquareOutlined,
  DeleteOutlined,
  MessageOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { ProjectContext } from '../../../../../context/project-context';
import ContributorsList from './contributors-list';
import ProjectAvatar from '../../../../../components/project-avatar';
import ShareModal from './share-modal';
import deleteProject from '../../../../../services/delete-project';
import { UserContext } from '../../../../../context/user-context';

interface DashboardSidebarProps {
  setPanel(panel: string): void;
  contributors: User[];
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  contributors,
  setPanel,
}): ReactElement => {
  const { user, setUser } = useContext(UserContext);
  const { project, setProject } = useContext(ProjectContext);
  const [isModalVisible, showModal] = useState(false);

  const handleMenuClick = (e: any) => {
    setPanel(e.key);
  };

  const HandleDeleteClick = async () => {
    const id = await deleteProject(project.id, user.token);
    setProject({
      id: '',
      owner: '',
      ownerName: '',
      repoName: '',
      channelId: '',
      contributors: [],
      name: '',
      githubUrl: '',
    });

    const newProjects = user.projects.filter((x: Project) => x.id !== id);
    setUser((prevState) => ({
      token: prevState.token,
      user: prevState.user,
      projects: newProjects,
    }));
  };

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
                icon={<DeleteOutlined />}
                danger
                style={{ marginRight: 8 }}
                onClick={HandleDeleteClick}
              />
              <Button
                icon={<ShareAltOutlined />}
                onClick={() => showModal(true)}
              />
            </Col>
          </Row>
        </div>
        <Menu
          style={{ border: 0 }}
          onClick={handleMenuClick}
          defaultSelectedKeys={['messages']}
        >
          <Menu.Item key="messages" icon={<MessageOutlined />}>
            Messages
          </Menu.Item>
          <Menu.Item key="commits" icon={<BranchesOutlined />}>
            Commit
          </Menu.Item>
          <Menu.Item key="todos" icon={<CheckSquareOutlined />}>
            todos
          </Menu.Item>
        </Menu>
        <ContributorsList contributors={contributors} />
      </Space>
      <ShareModal isVisible={isModalVisible} showModal={showModal} />
    </div>
  );
};

export default DashboardSidebar;
