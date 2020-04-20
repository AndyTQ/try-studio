import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom'; // for navigating back to sign-in page if there's no auth.
import { signUp } from '../redux/actions/authActions';



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = props => {
  const { auth, authError } = props;
  const classes = useStyles();

  const [state, setState] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.signUp(state);
  };

  if (auth.uid) {
    return <Redirect to='/' />;
  }

  return (
    <>{signUpComponent(classes, handleChange, handleSubmit, authError)}</>
  );
};

const signUpComponent = (classes, handleChange, handleSubmit, authError) => {
  return (
  <Container component="main" maxWidth="xs">
  <CssBaseline />
  <div className={classes.paper}>
    <Avatar className={classes.avatar}>
      <LockOutlinedIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
      Sign up
    </Typography>
    {signUpForm(classes, handleChange, handleSubmit, authError)}
  </div>
  <Box mt={5}>
  </Box>
  </Container>
  )
}

const firstName = (handleChange) => {
  return (
  <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                onChange={handleChange}
                autoFocus
              />
            </Grid>
            );
}

const lastName = (handleChange) => {
  return(
<Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={handleChange}
              />
            </Grid>
            );
}

const email = (handleChange) => {
  return(
  <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            );
}

const password = (handleChange) => {
  return(
  <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
            );
}

const signUpFormInputs = (handleChange) => {
  return(
  <>
  {firstName(handleChange)}
  {lastName(handleChange)}
  {email(handleChange)}
  {password(handleChange)}
  </>
  )
}

const signUpForm = (classes, handleChange, handleSubmit, authError) =>{
  return (
  <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2} justify="center">
            <Grid item xs={12}>
              <Typography variant="body2" color="error" align="center">
                {authError ? <span>{authError}</span> : null}
              </Typography>
            </Grid>
            {signUpFormInputs(handleChange)}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          {signInPrompt()}
        </form>
    );
}

const signInPrompt = () => {
  return (
  <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
    );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);