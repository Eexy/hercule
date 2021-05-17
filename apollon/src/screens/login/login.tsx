import React, { ReactElement } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import LoginForm from './parts/login-form';

const Login: React.FC = (): ReactElement => {
  const login = async (email = '', password = '') => {
    try {
      const res = await axios.post('/api/user/login', {
        email,
        password,
      });
      console.log(res);
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
