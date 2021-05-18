import React, { ReactElement } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import AuthProvider from './contexts/auth-context';
import Home from './screens/home/home';
import Login from './screens/login/login';
import Register from './screens/register/register';

function App(): ReactElement {
  return (
    <Router>
      <div className="App">
        <AuthProvider>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
          </Switch>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
