import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'; // for navigating back to sign-in page if there's no auth.
import LicenseTable from '../components/LicenseTable';
import { getLicenses } from '../redux/actions/licenseActions';
import Grid from '@material-ui/core/Grid';

const Licenses = props => {
  const { auth } = props;

  if (!auth.uid) {
    return <Redirect to='/' />;
  }

  return (
    <Grid container>
      <Grid item lg>
        <LicenseTable />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(Licenses);
