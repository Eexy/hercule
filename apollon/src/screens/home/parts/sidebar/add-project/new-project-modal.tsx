import { Modal } from 'antd';
import React, { ReactElement, useContext, useState } from 'react';
import { UserContext } from '../../../../../context/user-context';
import createProject from '../../../../../services/create-project';
import joinProject from '../../../../../services/join-project';
import JoinProjectForm from './join-project-form';
import NewProjectForm from './new-project-form';

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
  const [isJoinVisible, setIsJoinVisible] = useState(false);

  const newProject = async (name: string) => {
    const project = await createProject(name, user.token);
    if (project) {
      setUser((prevState) => ({
        token: prevState.token,
        user: prevState.user,
        projects: [...prevState.projects, project],
      }));
    }
  };

  const getFormFields = (project: NewProjectForm) => {
    setIsModalVisible(false);
    newProject(project.name);
  };

  const joinProjectField = async (id: string) => {
    setIsJoinVisible(false);
    const project = await joinProject(user.token, id);

    if (project) {
      setUser((prevState) => ({
        token: prevState.token,
        user: prevState.user,
        projects: [...prevState.projects, project],
      }));
    }
  };

  const showJoin = () => {
    setIsModalVisible(false);
    setIsJoinVisible(true);
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
        <NewProjectForm getFormFields={getFormFields} showJoin={showJoin} />
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
      <Modal
        className="join-project-modal"
        title="Join project"
        visible={isJoinVisible}
        onCancel={() => setIsJoinVisible(false)}
        destroyOnClose
        footer={null}
      >
        <JoinProjectForm
          joinProjectField={joinProjectField}
          showModal={setIsJoinVisible}
        />
      </Modal>
    </>
  );
};

export default NewProjectModal;
