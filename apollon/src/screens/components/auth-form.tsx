import React, { ReactElement } from 'react';

const AuthForm: React.FC = (): ReactElement => (
  <form>
    <p>
      <label htmlFor="user-email">
        Email:
        <input type="email" name="email" id="user-email" />
      </label>
    </p>
    <p>
      <label htmlFor="password">
        Password:
        <input type="password" id="password" />
      </label>
    </p>
  </form>
);

export default AuthForm;
