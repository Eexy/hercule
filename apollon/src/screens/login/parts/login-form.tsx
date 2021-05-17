import React, { ReactElement, useState } from 'react';

interface AuthFormProps {
  login(email: string, password: string): void;
}

const LoginForm: React.FC<AuthFormProps> = ({ login }): ReactElement => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handlePasswordChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setPassword(e.currentTarget.value);
  };

  const handleEmailChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setEmail(e.currentTarget.value);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <p>
        <label htmlFor="user-email">
          Email:
          <input
            type="email"
            name="email"
            id="user-email"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
      </p>
      <p>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
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