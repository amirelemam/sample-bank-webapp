import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import MyAccount from './components/MyAccount';
import NotFound from './components/NotFound';
import { ProtectedRoute } from './components/shared/ProtectedRoute';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" component={Home} sensitive exact />
        <Route path="/access-your-account" component={Login} sensitive exact />
        <ProtectedRoute
          path="/my-account"
          component={MyAccount}
          sensitive
          exact
        />
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
