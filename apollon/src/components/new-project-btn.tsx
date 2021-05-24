import { Button } from 'antd';
import React, { ReactElement } from 'react';
import { PlusOutlined } from '@ant-design/icons';

interface NewProjectBtn {
  isModalVisible: boolean;
  showModal(visible: boolean): void;
}

const NewProjectBtn: React.FC<NewProjectBtn> = ({
  isModalVisible,
  showModal,
}): ReactElement => {
  const handleClick = async () => {
    showModal(!isModalVisible);
  };

  return (
    <Button
      className="sidebar__btn"
      onClick={handleClick}
      style={{ height: 45, width: 45 }}
      type="primary"
      icon={<PlusOutlined />}
    />
  );
};

export default NewProjectBtn;
