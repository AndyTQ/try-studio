import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import { Link } from "react-router-dom";
import BarChartIcon from '@material-ui/icons/BarChart';

//// Components required for secondary list items
// import ListSubheader from '@material-ui/core/ListSubheader';
// import AssignmentIcon from '@material-ui/icons/Assignment';

const items = [
  { icon: <DashboardIcon />, field: "dashboard", name: "Dashboard" },
  { icon: <ShoppingCartIcon />, field: "licenses", name: "Licenses" },
  { icon: <PeopleIcon />, field: "playlists", name: "Playlists" },
  { icon: <BarChartIcon />, field: "settings", name: "Settings" },
];

/***** Main list items in the navigation bar *****/
export const mainListItems = items.map((item) =>
  <div key={item.name}>
    <ListItem button component={Link} to={"/" + item.field} style={{ height: '45px' }}>
      <ListItemIcon style={{ marginLeft: '0.5em', color: "rgb(238,238,238)", opacity: 0.5 }}>
        {item.icon}
      </ListItemIcon>
      <ListItemText primary={item.name} style={{ marginLeft: '-1em' }} />
    </ListItem>
  </div>
);
