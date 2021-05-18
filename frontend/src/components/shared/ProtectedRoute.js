import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './auth';

const ProtedtedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (isAuthenticated()) return <Component {...props} />;
      return (
        <Redirect
          to={{
            pathname: '/access-your-account',
            state: {
              from: props.location,
            },
          }}
        />
      );
    }}
  />
);

export default ProtedtedRoute;
