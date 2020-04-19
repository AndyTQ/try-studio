import React, {useEffect} from 'react';


import { makeStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { connect } from 'react-redux';
import { signOut, getUser } from '../redux/actions/authActions';

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


const Settings = (props) => {
  const { auth, currUser, getUser} = props;
  const classes = useStyles();

  useEffect(() => {
    getUser();
  }, []);
  
  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <Typography component="h5" variant="h5" color="inherit" noWrap>
          My Account
        </Typography>
        <Divider className={classes.divider} />
        {/* content for user settings*/}
        <div>
          {nameSetting()}
          <img
            src={process.env.PUBLIC_URL + '/construction.png'}
            alt="Logo"
          />
        </div>
      </div>
    </div>
  );
};

const nameSetting = () => {
  return(
    <>
  <Typography variant="h6" color="inherit" noWrap>
            Name
          </Typography>
          <Typography variant="body1" color="inherit" noWrap>
            {currUser ? currUser.firstName + ' ' + currUser.lastName : ''}
          </Typography>
          </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
