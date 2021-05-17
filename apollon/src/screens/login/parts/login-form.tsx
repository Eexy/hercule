import React, { ReactElement, useState } from 'react';

interface AuthFormProps {
  login(email: string, password: string): void;
}

const LoginForm: React.FC<AuthFormProps> = ({ login }): ReactElement => {
  const [loginFields, setLoginFields] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const {id, value} = e.currentTarget;
    setLoginFields(prevState => ({
      ...prevState,
      [id]: value
    }));
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    login(loginFields.email, loginFields.password);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <p>
        <label htmlFor="user-email">
          Email:
          <input
            type="email"
            name="email"
            id="email"
            value={loginFields.email}
            onChange={handleChange}
          />
        </label>
      </p>
      <p>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            name="password"
            value={loginFields.password}
            onChange={handleChange}
          />
        </label>
      </p>
      <p>
        <button type="submit">Login</button>
      </p>
    </form>
  );
};
export default LoginForm;
