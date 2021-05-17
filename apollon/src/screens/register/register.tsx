import axios from 'axios';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from './parts/register-form';

const Register: React.FC = (): ReactElement => {
  const register = async (email = '', password = '') => {
    try {
      const res = await axios.post('/api/user/register', { email, password });
      console.log(res);
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
