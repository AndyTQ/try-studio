import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'; // for navigating back to sign-in page if there's no auth.
import Table from '../components/Table';

import { getLicenses } from '../redux/actions/licenseActions';

const Licenses = props => {
  const { auth, licenses, getLicenses } = props;

  useEffect(() => {
    getLicenses();
  }, []);

  if (!auth.uid) {
    return <Redirect to='/' />;
  }
  
  return <Table licenses={licenses} />;
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    licenses: state.license.licenses
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLicenses: () => dispatch(getLicenses())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Licenses);
