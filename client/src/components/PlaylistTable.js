import React, { useEffect, Component, useState } from 'react';
import { connect } from 'react-redux';
import Table2 from './Table2';
import { getPlaylists } from '../redux/actions/playlistActions';

const PlaylistTable = ({playlists, getPlaylists}) => {

  useEffect(() => {
    getPlaylists();
  }, []);

  return (
    <Table2 playlists={playlists} title="Playlists" />
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

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistTable);
