import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Amplify from 'aws-amplify';
import aws_exports from '../../aws-exports';
import { isAuthenticated } from './auth';

Amplify.configure(aws_exports);

export const ProtectedRoute = ({ component: Component, user, ...rest }) => {
  const [hasAuthenticated, sethasAuthenticated] = useState(true);

  useEffect(() => {
    (async () => {
      let user = null;

      try {
        user = await isAuthenticated();
        if (user) {
          sethasAuthenticated(true);
        } else {
          sethasAuthenticated(false);
        }
      } catch (e) {
        sethasAuthenticated(false);
      }
    })();
  });
  return (
    <Route
      {...rest}
      render={(props) => {
        if (hasAuthenticated) return <Component {...props} />;
        else {
          return (
            <Route
              {...rest}
              render={(props) => {
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
        }
      }}
    />
  );
};
