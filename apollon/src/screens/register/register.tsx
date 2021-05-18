import axios from 'axios';
import React, { ReactElement, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth-context';
import RegisterForm from './parts/register-form';

const Register: React.FC = (): ReactElement => {
  const { setUser } = useContext(AuthContext);
  const history = useHistory();

  const register = async (email = '', password = '') => {
    try {
      const res = await axios.post('/api/user/register', { email, password });
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
      <Link to="/login">Login</Link>
      <RegisterForm register={register} />
    </div>
  );
};

export default Register;
