import { Modal, Input } from 'antd';
import React, { ReactElement, useContext } from 'react';
import { ProjectContext } from '../../../../../context/project-context';

interface ShareModalPros {
  isVisible: boolean;
  showModal(isVisible: boolean): void;
}

const ShareModal: React.FC<ShareModalPros> = ({
  isVisible,
  showModal,
}): ReactElement => {
  const { project } = useContext(ProjectContext);

  return (
    <Modal
      visible={isVisible}
      onOk={() => showModal(false)}
      onCancel={() => showModal(false)}
      title="Share you project"
    >
      <p>Here is your project share it to your to your friend</p>
      <Input value={project.id} />
    </Modal>
  );
};

export default ShareModal;
