import React, { ReactElement, useContext } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import GithubBtn from '../../components/github-btn';
import { ClientContext } from '../../context/client-context';
import { UserContext } from '../../context/user-context';

const Login: React.FC = (): ReactElement => {
  const { user, setUser } = useContext(UserContext);
  const { client } = useContext(ClientContext);
  const history = useHistory();

  if (user.token !== '') {
    client.connect();
    return <Redirect to="/" />;
  }

  const getAuth = (data: any) => {
    setUser({ token: data.token, user: data.user, projects: data.projects });
    client.connect();
    history.push('/');
  };

  return (
    <div className="login">
      <GithubBtn getAuth={getAuth} />
    </div>
  );
};
export default Login;
