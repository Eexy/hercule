import React, { ReactElement, useState } from 'react';

interface RegisterFormProps {
  register(email: string, password: string): void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ register }): ReactElement => {
  const [registrationFields, setRegistrationFields] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const {id, value} = e.currentTarget;
    setRegistrationFields(prevState => ({
      ...prevState,
      [id]: value
    }));
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    register(registrationFields.email, registrationFields.password);
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
            value={registrationFields.email}
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
            value={registrationFields.password}
            onChange={handleChange}
          />
        </label>
      </p>
      <p>
        <button type="submit">Register</button>
      </p>
    </form>
  );
};

export default RegisterForm;
