import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { Licenses, SignIn, SignUp, Dashboard, Playlists, Settings } from './pages';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import RouteWithLayout from './RouteWithLayout';
import { Navigation as NavigationLayout } from './layouts';
import { Default as DefaultLayout } from './layouts';

const browserHistory = createBrowserHistory();

/**
 * @returns The Router of the application.
 */
const Routes = () => {
  return (
    <Router history={browserHistory}>
      <Switch>
        <RouteWithLayout exact path="/" component={SignIn} layout={DefaultLayout} />
        <RouteWithLayout path="/dashboard" component={Dashboard} layout={NavigationLayout} />
        <RouteWithLayout path="/licenses" component={Licenses} layout={NavigationLayout} />
        <RouteWithLayout path="/playlists" component={Playlists} layout={NavigationLayout} />
        <RouteWithLayout path="/settings" component={Settings} layout={NavigationLayout} />
        <RouteWithLayout path="/signup" component={SignUp} layout={DefaultLayout} />
        <Redirect path="/try-studio" to="/" />
        <Redirect to="/not-found" />
      </Switch>
    </Router>
  );
};

export default Routes;