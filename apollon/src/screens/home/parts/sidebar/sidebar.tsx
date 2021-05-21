import React, { ReactElement } from "react";
import ProjectsList from "../../../../components/projects-list/project-list";
import './sidebar.css';

const Sidebar: React.FC = (): ReactElement => (
  <div className="sidebar">
    <ProjectsList />
  </div>
); 

export default Sidebar;