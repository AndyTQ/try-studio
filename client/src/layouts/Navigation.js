/**
 * Material-ui dashboard template.
 * From https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates/dashboard
 */

import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import { mainListItems } from '../components/ListItems';
import { connect } from 'react-redux';
import { signOut, getUser } from '../redux/actions/authActions';
import { Redirect } from 'react-router-dom'; // for navigating back to sign-in page if there's no auth.

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    backgroundColor: "white",
    boxShadow: "rgba(53, 64, 82, 0.05) 0px 0px 14px 0px;",
  },
  toolBar: {
    paddingTop: '10px', paddingBottom: '10px'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    backgroundColor: "#1b2430",
    width: drawerWidth,
    color: "rgb(238, 238, 238)"
  },
  logoBar: {
    backgroundColor: "#232f3e",
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(5),
  },
  clickable: {
    marginLeft: '15px',
    marginRight: '15px',
  }
}));

const Navigation = props => {
  const { auth, currUser, children, getUser} = props;
  const classes = useStyles();

  useEffect(() => {
    getUser();
  }, []);

  if (!auth.uid) {
    return <Redirect to='/' />;
  } 

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Typography component="h1" variant="h6" color="textSecondary" noWrap className={classes.title}>
          </Typography>
          <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
          <Link href='/settings'>
            <Typography className={classes.clickable} color="textPrimary" >
              {(currUser == null ? 'Loading...' : currUser.firstName + ' ' + currUser.lastName)}
            </Typography>
          </Link>
          <Divider orientation="vertical" flexItem />
          <Button
            className={classes.clickable}
            startIcon={<MeetingRoomIcon />}
            onClick={props.signOut}>
            Sign Out
            </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar className={classes.logoBar}>
          <img
            src={process.env.PUBLIC_URL + '/logo_white.svg'}
            alt="Logo"
            width={125}
            height={60}
          />

        </Toolbar>
        <div className={classes.drawerContainer}>
          <List>{mainListItems}</List>
          <Divider />
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {children}
      </main>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    currUser: state.auth.currUser
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
    getUser: () => dispatch(getUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
