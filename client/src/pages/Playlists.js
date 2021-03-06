import React from 'react';

import Submenu from '../components/Submenu';
import PlaylistTable from '../components/PlaylistTable';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const Playlists = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={2}>
          <Submenu />
        </Grid>
        <Grid item xs={10}>
          <div align='center'>
            <PlaylistTable className={classes.content} title="My Music" />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Playlists;
