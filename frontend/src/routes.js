import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Home from './components/Home';
import Login from './components/Login';
import MyAccount from './components/MyAccount';
import NotFound from './components/NotFound';
import BranchFinder from './components/BranchFinder';
import Footer from './components/shared/Footer';
import PlansAndFees from './components/PlansAndFees';
import ProtectedRoute from './components/shared/ProtectedRoute';
import { root } from './components/shared/styles';

const useStyles = makeStyles({
  root,
});

const Routes = () => {
  const classes = useStyles();

  return (
    <BrowserRouter className={classes.root}>
      <Switch>
        <Route path="/" component={Home} sensitive exact />
        <Route path="/access-your-account" component={Login} sensitive exact />
        <ProtectedRoute
          path="/my-account"
          component={MyAccount}
          sensitive
          exact
        />
        <Route path="/find-a-branch" component={BranchFinder} sensitive exact />
        <Route path="/plans-and-fees" component={PlansAndFees} sensitive exact />
        <Route path="/footer" component={Footer} />
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
