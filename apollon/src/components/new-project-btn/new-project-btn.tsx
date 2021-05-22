import React, { ReactElement, useContext } from 'react';
import { UserContext } from '../../context/user-context';
import createProject from '../../utils/create-project';

interface NewProjectBtn{
  isModalVisible: boolean;
  showModal(visible: boolean): void;
}

const NewProjectBtn: React.FC<NewProjectBtn> = ({isModalVisible, showModal}): ReactElement => {
  const {user, setUser} = useContext(UserContext);

  const handleClick = async () => {
    /* const project = await createProject('friendly-potato', user.token);
    setUser(prevState => ({
      token: prevState.token,
      user: prevState.user,
      projects: [...prevState.projects, project]
    })); */
    showModal(!isModalVisible);
  };
  
  return (
    <button type="button" className="sidebar__btn" onClick={handleClick}>
      <span className="sidebar__btn__first-letter">+</span>
    </button>
  );
};

export default NewProjectBtn;
