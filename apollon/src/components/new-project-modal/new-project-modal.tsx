import { Modal } from 'antd';
import React, { ReactElement, useContext, useState } from 'react';
import { UserContext } from '../../context/user-context';
import createProject from '../../utils/create-project';
import NewProjectForm from '../new-project-form/new-project-form';

interface NewProjectModalProps {
  isModalVisible: boolean;
  setIsModalVisible(isModalVisible: boolean): void;
}

const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isModalVisible,
  setIsModalVisible,
}): ReactElement => {
  const { user, setUser } = useContext(UserContext);
  const [isErrorVisible, setIsErrorVisible] = useState(false);

  const newProject = async (name: string) => {
    try {
      const project = await createProject(name, user.token);
      setUser((prevState) => ({
        token: prevState.token,
        user: prevState.user,
        projects: [...prevState.projects, project],
      }));
    } catch (e) {
      setIsErrorVisible(true);
    }
  };

  const getFormFields = (project: ProjectForm) => {
    setIsModalVisible(false);
    newProject(project.name);
  };

  return (
    <>
      <Modal
        className="new-project-modal"
        title="New Project"
        visible={isModalVisible}
        footer={null}
        destroyOnClose
        onCancel={() => setIsModalVisible(false)}
      >
        <NewProjectForm getFormFields={getFormFields} />
      </Modal>
      <Modal
        className="error-modal"
        title="Error"
        visible={isErrorVisible}
        onCancel={() => setIsErrorVisible(false)}
        onOk={() => setIsErrorVisible(false)}
      >
        <p>Unable to create project. Please try again</p>
      </Modal>
    </>
  );
};

export default NewProjectModal;
