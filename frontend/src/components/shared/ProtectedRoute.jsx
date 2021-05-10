import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './auth';

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

        return (
          <Route
            {...rest}
            render={(props) => (
              <Redirect
                to={{
                  pathname: '/access-your-account',
                  state: {
                    from: props.location,
                  },
                }}
              />
            )}
          />
        );
      }}
    />
  );
};
