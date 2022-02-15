import React, { useEffect, Component, useState } from 'react';
import { connect } from 'react-redux';
import Table from './Table';
import { getLicenses } from '../redux/actions/licenseActions';

const Licenses = ({licenses, getLicenses, businessId}) => {

  useEffect(() => {
        getLicenses(businessId);
      }, []);  

  return (
    <Table licenses={licenses} businessId={businessId} title="My Licenses" />
  );
} 

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    licenses: state.license.licenses
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getLicenses: (businessId) => dispatch(getLicenses(businessId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Licenses);
