import React, { useEffect, Component, useState } from 'react';
import { connect } from 'react-redux';
import Table from './Table';
import { getPlaylists } from '../redux/actions/playlistActions';

const Playlists = ({playlists, getPlaylists}) => {

  useEffect(() => {
    getPlaylists();
  }, []);
    
  

  return (
    <Table licenses={playlists} title="Playlists" />
  );
} 

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    playlists: state.playlist.playlists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPlaylists: () => dispatch(getPlaylists())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
