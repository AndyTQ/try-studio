import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { Licenses, SignIn, SignUp } from './pages';
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
        <RouteWithLayout exact path="/" component={Dashboard} layout={NavigationLayout} />
        <RouteWithLayout path="/dashboard" component={Dashboard} layout={NavigationLayout} />
        <RouteWithLayout path="/mylicenses" component={Licenses} layout={NavigationLayout} />
        <RouteWithLayout path="/streaming" component={Streaming} layout={NavigationLayout} />
        <RouteWithLayout path="/settings" component={Settings} layout={NavigationLayout} />
        <RouteWithLayout path="/signin" component={SignIn} layout={DefaultLayout} />
        <RouteWithLayout path="/signup" component={SignUp} layout={DefaultLayout} />
        <Redirect path="/try-studio" to="/" />
        <Redirect to="/not-found" />
      </Switch>
    </Router>
  );
};

const Dashboard = () => (
  <div>
    Dashboard
  </div>
);

const Streaming = () => (
  <div>
    Streaming
  </div>
);

const Settings = () => (
  <div>
    Setting
  </div>
);

export default Routes;