import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './Components/Routing/PrivateRoute';
import NavBarWrapper from './Components/Navbar/NavBarWrapper';

import NotFoundPage from './Pages/NotFoundPage/NotFoundPage';

import { officerOrAdminRoutes, notAuthenticatedRoutes, signedOutRoutes, allowedIf } from './Routes.js';

import DessertsPage from './Pages/Desserts/AdminDesserts.js';

export default function Routing({ appProps }) {

  const signedInRoutes = [...officerOrAdminRoutes, ...notAuthenticatedRoutes, 
    {
      Component: DessertsPage,
      path: '/desserts-admin',
      allowedIf: allowedIf.OFFICER_OR_ADMIN,
      redirect: '/',
      inAdminNavbar: true
    }
  ];

  return (
    <div>
      <Switch>
        {signedInRoutes.map(
          ({
            path,
            Component,
            allowedIf,
            redirect,
            inAdminNavbar,
            hideAdminNavbar = false,
          }, index) => {
            function getCorrectComponent(privateRouteProps) {
              if (hideAdminNavbar) {
                return <Component {...privateRouteProps} />;
              }
              return (<NavBarWrapper
                component={Component}
                enableAdminNavbar={inAdminNavbar}
                {...privateRouteProps}
              />);
            }
            return (
              <PrivateRoute
                key={index}
                exact
                path={path}
                appProps={{
                  allowed: allowedIf,
                  redirect,
                  ...appProps
                }}
                component={props => getCorrectComponent(props)}
              />
            );
          }
        )}
        {signedOutRoutes.map(({ path, Component }, index) => {
          return (
            <Route
              key={index}
              exact
              path={path}
              render={props => (
                <NavBarWrapper component={Component} {...props} {...appProps} />
              )}
            />
          );
        })}
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}
