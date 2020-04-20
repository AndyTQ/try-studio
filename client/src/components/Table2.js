import React, { useEffect, useCallback, useState, useRef} from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import TablePagination from '@material-ui/core/TablePagination';

import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';

import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';

import DeleteOutline from '@material-ui/icons/DeleteOutline';

import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Add from '@material-ui/icons/Add';

import {
    TextField,
  } from "@material-ui/core";

import Modal from './Modal';

import { useFirestore, useFirebase } from 'react-redux-firebase'


const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const Table2 = ({ title, playlists }) => {

  const buildColumn = (title, field, type) => {
    return {titie: title, field: field, type: type}
  }

  const [allowAdd, setAllowAdd] = useState(false);
  const [state, setState] = React.useState({
    columns: [
      buildColumn('Playlist ID', 'playlistId', 'string'),
      buildColumn('Playlist Name', 'name', 'string'),
      buildColumn('Playlist Owner', 'owner', 'string'),
      buildColumn('Playlist Track Count', 'count', 'numeric'),
    ],
    data: playlists,
  });
  let textInput = useRef(null);

  const firebase = useFirebase();
  const firestore = useFirestore();

  let playlistRef = firestore.collection('playlists');

  const addUserData = (type, newId) => {
    let uid = firebase.auth().currentUser.uid;
    firestore.collection('users').doc(uid).get().then((doc) => { 
      let userData = doc.data();
      userData[type].push(newId);
      firestore.collection('users').doc(uid).set(userData);
    }
    );
  }

  const fireStoreAddPlaylist = (playlistId, playlistInfo) => {
    let data = {};
    let newId = playlistRef.doc().id;
    data.playlistId = playlistId;
    data.name = playlistInfo.name;
    data.owner = playlistInfo.owner;
    data.count = playlistInfo.songs;
    playlistRef.doc(newId).set({...data})
    .then(()=>{
        addUserData("playlists", newId)
      }
    )
  }

  const handleClick = () => {
    fetch(`http://try-studio.herokuapp.com/playlist?playlistId=${textInput.current.value}`).then(res => res.json()).then(data => {
        console.log(data);
        fireStoreAddPlaylist(textInput.current.value, data);
    });
  }

  const updateAllowance = () => {
    let uid = firebase.auth().currentUser.uid;
    firestore.collection('users').doc(uid).get().then((doc) => {
      let userData = doc.data();
      if (!userData.playlists || userData.playlists.length < 10) {
        setAllowAdd(true);
      } else {
        setAllowAdd(false);
      }
    })
  }

  useEffect(() => {
    setState({
      ...state,
      data: playlists,
    });
    updateAllowance();
  }, [playlists]);
  
  const displayToolbar = () => {
    if (allowAdd) {
        return (
            <div>
            <TextField inputRef={textInput} variant="outlined" label="Playlist ID" style={{width: 200}}/>
            <Button
                variant="contained"
                color="secondary"
                startIcon={<Add />}
                onClick={handleClick}
                style={{marginLeft:15}}>
                Add Playlist
            </Button>
            </div>
        );
    }
    else {
      return (<Typography variant="body1" style={{marginTop: 5, marginLeft: 20, color: "grey"}}> You have reached the limit of adding new playlists. </Typography>)
    } 
  }

  return (
    <div>
    <MaterialTable
      icons={tableIcons}
      title="Playlists"
      columns={state.columns}
      data={state.data}
      style={{
        boxShadow: 'rgba(53, 64, 82, 0.05) 0px 0px 14px 0px',
      }}
      components={{
        Toolbar: props => ( // Override the original toolbar
          <div>
            <MTableToolbar {...props}
              title={
                <Typography component="h1" variant="h6" color="inherit" style={{display: 'flex', flexDirection: 'column', textAlign: 'left', marginTop: 10}}>
                  {title}
                  {displayToolbar()}
                </Typography>
              }
            />
          </div>
        )
      }}
      options={{
        rowStyle: {
          backgroundColor: '#FFF',
        },
        headerStyle: {
          backgroundColor: '#FFF',
          color: 'primary',
        },
        exportButton: true,
      }}
    />
    </div>
  );
};

export default React.memo(Table2);
