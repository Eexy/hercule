import React, { ReactElement, useContext } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import LoginForm from './parts/login-form';
import { AuthContext } from '../../contexts/auth-context';

const Login: React.FC = (): ReactElement => {
  const { setUser } = useContext(AuthContext);
  const history = useHistory();

  const login = async (email = '', password = '') => {
    try {
      const res = await axios.post('/api/user/login', {
        email,
        password,
      });
      const { data } = res;

      setUser({
        token: data.token,
        email: data.user.email,
        id: data.user.id,
        projects: data.user.projects,
      });

      history.push('/');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <Link to="/register">Register</Link>
      <LoginForm login={login} />
    </div>
  );
};
export default Login;
