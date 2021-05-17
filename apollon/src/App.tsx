import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import Login from './screens/login/login';
import Register from './screens/register/register';

function App(): ReactElement {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
