import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { Licenses, SignIn, SignUp, Dashboard, Playlists, Settings } from './pages';
import { BrowserRouter as Router } from 'react-router-dom';
import RouteWithLayout from './RouteWithLayout';
import { Navigation as NavigationLayout } from './layouts';
import { Default as DefaultLayout } from './layouts';

import history from './history';

/**
 * @returns The Router of the application.
 */
const Routes = () => {
  return (
    <Router history={history}>
      <Switch>
        <RouteWithLayout exact path="/try-studio" component={SignIn} layout={DefaultLayout} />
        <RouteWithLayout path="/try-studio/dashboard" component={Dashboard} layout={NavigationLayout} />
        <RouteWithLayout path="/try-studio/licenses" component={Licenses} layout={NavigationLayout} />
        <RouteWithLayout path="/try-studio/playlists" component={Playlists} layout={NavigationLayout} />
        <RouteWithLayout path="/try-studio/settings" component={Settings} layout={NavigationLayout} />
        <RouteWithLayout path="/try-studio/signup" component={SignUp} layout={DefaultLayout} />
        <Redirect path="/" to="/try-studio" />
        <Redirect to="/try-studio/not-found" />
      </Switch>
    </Router>
  );
};


export default Routes;