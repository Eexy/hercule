import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserProvider from './context/user-context';
import Home from './screens/home/home';
import Login from './screens/login/login';
import 'antd/dist/antd.css';
import ProjectProvider from './context/project-context';

function App(): ReactElement {
  return (
    <div className="app">
      <Router>
        <UserProvider>
          <ProjectProvider>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </ProjectProvider>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
