import React, {useEffect} from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'; // for navigating back to sign-in page if there's no auth.

import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import { Businesses } from '../components';
import { getUser } from '../redux/actions/authActions';


const useStyles = makeStyles({
  divider: {
    marginTop: '18px',
    marginBottom: '24px',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  content: {
    margin: '20px'
  }
});


const Dashboard = props => {
  const { auth, currUser, getUser/*, businesses, getBusinesses */ } = props;
  const classes = useStyles();

  useEffect(() => {
    getUser();
  }, []);

  if (!auth.uid) {
    return <Redirect to='/' />;
  }

  return (
    <div className={classes.container}>
      {/* <Businesses/> */}
        <Typography component="h5" variant="h5" color="inherit" noWrap>
          Welcome back, {(currUser == null ? '(Loading your name...)' : currUser.firstName)}. Time to play some music for your business, or get a new license!
        </Typography>
        <Divider className={classes.divider} />
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Businesses />
          </Grid>
        </Grid>
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
    getUser: () => dispatch(getUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
