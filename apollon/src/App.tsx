import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserProvider from './context/user-context';
import Home from './screens/home/home';
import Login from './screens/login/login';
import './app.css';

function App(): ReactElement {
  return (
    <div className="app">
      <Router>
        <UserProvider>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
