import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListSubheader from '@material-ui/core/ListSubheader';
import SpotifyIcon from '@material-ui/icons/Contactless';
import AppleIcon from '@material-ui/icons/Apple';
import YouTubeIcon from '@material-ui/icons/YouTube';
import RecentIcon from '@material-ui/icons/QueryBuilder';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const items = [
  { icon: <SpotifyIcon />, name: "Spotify", enabled: true },
  { icon: <AppleIcon />, name: "Apple Music (Coming)", enabled: false },
  { icon: <YouTubeIcon />,  name: "PlaYoutube Music (Coming)", enabled: false },
];

const streamingServicePanel = () => {
  return(
    <div>
        {items.map(item => (
          <ListItem button disabled={!item.enabled}>
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
    </div>
  );
}


export default function Submenu() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <List
        subheader={
          <ListSubheader component="div">
            Streaming Service
          </ListSubheader>
        }
        component="nav"
        aria-label="main mailbox folders">
        {streamingServicePanel()}
      </List>
      <Divider />
    </div>
  );
}