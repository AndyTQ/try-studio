import React from 'react';
import { Route } from 'react-router';

/**
 * Apply the corresponding layout and component to a Route
 * @param component The component to display in a Route
 * @param layout The layout to apply upon the component 
 */
const RouteWithLayout = ({ component: Component, layout: Layout, ...rest}) => (
    <Route 
        {...rest}
        render={props => (
            <Layout>
                <Component {...props} />
            </Layout>
        )}
    />
)

export default RouteWithLayout;