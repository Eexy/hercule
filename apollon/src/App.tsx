import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserProvider from './context/user-context';
import Login from './screens/login';
import 'antd/dist/antd.css';
import ProjectProvider from './context/project-context';
import ClientProvider from './context/client-context';
import Home from './screens/home';

function App(): ReactElement {
  return (
    <div className="app">
      <Router>
        <UserProvider>
          <ProjectProvider>
            <ClientProvider>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </ClientProvider>
          </ProjectProvider>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
