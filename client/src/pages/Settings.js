import React from 'react';


import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';


import Businesses from '../components/Businesses';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  divider: {
    marginTop: '18px',
    marginBottom: '24px',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  section: {
    padding: '10px'
  }
}));


const Settings = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <Typography component="h5" variant="h5" color="inherit" noWrap>
          My Businesses
        </Typography>
        <Divider className={classes.divider} />
        <Businesses />
      </div>
      <div className={classes.section}>
        <Typography component="h5" variant="h5" color="inherit" noWrap>
          My Account
        </Typography>
        <Divider className={classes.divider} />
        {/* content for user settings*/}
        <div>
          <Typography variant="h6" color="inherit" noWrap>
            Name
          </Typography>
          <Typography variant="body1" color="inherit" noWrap>
            [Your name]
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Settings;
