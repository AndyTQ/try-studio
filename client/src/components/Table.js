import React, { useEffect, useCallback, useState, useRef} from 'react';
import MaterialTable, { MTableToolbar } from 'material-table';
import TablePagination from '@material-ui/core/TablePagination';

import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import {
  TextField,
} from "@material-ui/core";
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
import UpdateIcon from '@material-ui/icons/Update';

import Modal from './Modal';
import Questions from './Questions';

import { useLocation } from 'react-router-dom';

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

const Table = ({ title, licenses, businessId, playlists }) => {

  const buildColumn = (title, field, type) => {
    return {title: title, field: field, type: type}
  }

  const [allowAdd, setAllowAdd] = useState(false);
  
  const dataColumns = playlists ? [
    buildColumn('Playlist ID', 'playlistId', 'string'),
    buildColumn('Playlist Name', 'name', 'string'),
    buildColumn('Playlist Owner', 'owner', 'string'),
    buildColumn('Playlist Track Count', 'count', 'numeric'),
  ] : [
    buildColumn('License ID', 'licenseId', 'string'),
    buildColumn('Business ID', 'business', 'string'),
    buildColumn('Licensing Company', 'cmo', 'string'),
    buildColumn('Price', 'price', 'numeric'),
    buildColumn('Registration Date', 'date', 'string'),
  ]

  const [state, setState] = React.useState({
    columns: dataColumns,
    data: playlists ? playlists : licenses,
  });

  let textInput = useRef(null);

  const mode = playlists ? "playlists" : "licenses"

  const [openNew, setOpenNew] = React.useState(false);
  const [openAssess, setOpenAssess] = React.useState(false);
  const firebase = useFirebase();
  const firestore = useFirestore();
  let location = useLocation();

  let playlistRef = firestore.collection('playlists');

  const updateAllowance = () => {
    let uid = firebase.auth().currentUser.uid;
    firestore.collection('users').doc(uid).get().then((doc) => {
      let userData = doc.data();
      if (userData[mode].length < 10){
        setAllowAdd(true);
      } else {
        setAllowAdd(false);
      }
    })
  }
  const addUserData = (type, newId) => {
    let uid = firebase.auth().currentUser.uid;
    firestore.collection('users').doc(uid).get().then((doc) => { 
      let userData = doc.data();
      userData[type].push(newId);
      firestore.collection('users').doc(uid).set(userData);
    }
    );
  }

  const handleClick = () => {
    let playlistIds = playlists.map(i => i.playlistId);
    if (playlistIds.includes(textInput.current.value)) {
      return;
    }
    fetch(`http://try-studio.herokuapp.com/playlist?playlistId=${textInput.current.value}`).then(res => res.json()).then(data => {
        fireStoreAddPlaylist(textInput.current.value, data);
    });
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


  const openHandler = useCallback(() => {
    setOpenNew(true);
  });

  const closeHandler = useCallback(() =>{ 
    setOpenNew(false);
  });
  
  const monitor = playlists ? [playlists] : [licenses];

  useEffect(() => {
    setState({
      ...state,
      data: playlists ? playlists : licenses
    });
    updateAllowance();
  }, monitor);
  
  const displayToolbar = () => {
    if (location.pathname != "/licenses"){
      if (allowAdd) {
        return (
          <div style={{marginLeft: 20}}>
            {playlists ? <TextField inputRef={textInput} variant="outlined" label="Playlist ID" style={{width: 200}} /> : <></>}
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Add />}
              onClick={playlists ? handleClick : openHandler}
              style={playlists ? {marginTop: 10, marginLeft: 10} : {}}
              >
              Add New
            </Button>
          </div>
        );
      }
      else{
        return (<Typography variant="body1" style={{marginTop: 5, marginLeft: 20, color: "grey"}}> You have reached the limit of adding new {playlists ? "playlist" : "licenses"}. </Typography>)
      }
    } 
    else {
      return <Typography style={{marginTop: 5, marginLeft: 20, color: "grey"}}variant="body1"> To add a new license, go to Businesses > Select a business > Add New</Typography>
    }
  }

  return (
    <div>
    <MaterialTable
      icons={tableIcons}
      title={mode.charAt(0).toUpperCase() + mode.substring(1)}
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
                <div>
                  <Typography component="h1" variant="h6" color="inherit" style={{display: 'flex'}}>
                    <Typography component="h1" variant="h6" color="inherit" style={playlists ? {marginTop: 10} : {}}>
                    {mode.charAt(0).toUpperCase() + mode.substring(1)}
                    </Typography>
                    {displayToolbar()}
                  </Typography>
                  
                </div>
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
    <Modal name="Licenses" open={openNew} handleClose={closeHandler}> 
      <Questions businessId={businessId} />
    </Modal>
    </div>
  );
};

export default React.memo(Table);
