import React, { ReactElement, useContext} from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import GithubBtn from '../../components/github-btn/github-btn';
import { UserContext } from '../../context/user-context';

const Login: React.FC = (): ReactElement => {
  const {user, setUser} = useContext(UserContext);
  const history = useHistory();

  if(user.token !== ""){
    return <Redirect to='/' />
  }

  const getAuth = (data: any) => {
    setUser({token: data.token, user: data.user});
    history.push('/');
  };

  return (
    <div className="login">
      <GithubBtn getAuth={getAuth} />
    </div>
  );
};
export default Login;
