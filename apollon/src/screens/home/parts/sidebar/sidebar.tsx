import React, { ReactElement } from "react";
import NewProjectBtn from "../../../../components/new-project-btn/new-project-btn";
import ProjectsList from "../../../../components/projects-list/project-list";
import './sidebar.css';

interface SidebarProps{
  isModalVisible: boolean;
  showModal(visible: boolean): void;
}

const Sidebar: React.FC<SidebarProps> = ({isModalVisible, showModal}): ReactElement => (
  <div className="sidebar">
    <NewProjectBtn isModalVisible={isModalVisible} showModal={showModal}/>
    <ProjectsList />
  </div>
); 

export default Sidebar;