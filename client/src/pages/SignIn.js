/**
 * Material-ui's official side sign-in template.
 * From https://github.com/devias-io/react-material-dashboard/blob/master/src/views/SignIn/SignIn.js
 */

import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Theme from '../Theme';
import Logo from '../logo.png';

import { connect } from 'react-redux';
import { signIn } from '../redux/actions/authActions'
import { Redirect } from 'react-router-dom'; // for navigating back to sign-in page if there's no auth.


/**
 * @returns The copyright text
 */
const Copyright = () => (
  <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © Try Studio '}
    {new Date().getFullYear()}
    {'.'}
  </Typography>
);

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundImage: 'url(' + process.env.PUBLIC_URL + '/signin_photo.png)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  image: {

    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  logo: {
    margin: theme.spacing(1),
    width: 300 * 1.3,
    height: 110 * 1.3
  },
  mottoBox: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  motto: {
    color: 'white',
    fontWeight: 300,
    maxWidth: 600,
    textIndent: 40
  }
}));

const SignInSide = props => {
  const classes = useStyles(Theme);
  const { auth, authError } = props;

  const [state, setState] = useState({email: '', password: '',});

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.signIn(state);
  };

  if (auth.uid) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} >
      <div className={classes.mottoBox}>
        <Typography component="h1" variant="h5" className={classes.motto}>
          &quot;{"My business has been completed shifted by the infinite power from Try Studio. I believe that they will change the entire planet."}&quot;
        </Typography>
        <Typography component="h1" variant="h5" className={classes.motto} align='right'>
          -- CEO, Macrohard
        </Typography>
      </div>
      </Grid>
      <Grid style={{backgroundColor: 'rgba(255,255,255,0.7)'}} item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img src={Logo} className={classes.logo} alt="Try Studio" />
          <Typography component="h1" color="textSecondary" variant="h5" style={{fontWeight: 400}}>
            Already have an account? Sign in!
          </Typography>
          <Typography variant="body2" color="error" align="center">
            { authError ? <span>{ authError }</span> : null }
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit}>
            {signInFormComponent(handleChange, classes)}
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

const signInFormComponent = (handleChange, classes) => {
  return (
    <div>
    <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={handleChange}
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInSide);
