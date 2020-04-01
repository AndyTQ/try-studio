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
  {icon: <DashboardIcon />, field: "dashboard", name: "Dashboard"},
  {icon: <ShoppingCartIcon />,field: "mylicenses", name: "My Licenses"},
  {icon: <PeopleIcon />, field: "streaming", name: "Streaming"},
  {icon: <BarChartIcon />, field: "settings", name: "Settings"},
]

/***** Main list items in the navigation bar *****/
export const mainListItems = items.map((item) =>
  <div>
    <ListItem button component={Link} to= {"/" + item.field}>
      <ListItemIcon>
        {item.icon}
      </ListItemIcon>
      <ListItemText primary={item.name} />
    </ListItem>
  </div>
);

/***** Secondary list items in the navigation bar *****/
// export const secondaryListItems = (
//   <div>
//     <ListSubheader inset>Saved reports</ListSubheader>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItem>
//   </div>
// );
