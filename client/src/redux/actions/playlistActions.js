export const getPlaylists = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const playlistsRef = firebase.firestore().collection("playlists");
    firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).onSnapshot(doc => {
      let playlists = [];
      let playlistIds = doc.data().playlists
      if (playlists && playlistsIds.length > 0){
        let playlistsRefs = playlistsRef.where(firebase.firestore.FieldPath.documentId(), "in", playlistIds)
        playlistsRefs.get().then(snapshot => {
          snapshot.forEach(doc => {
            let data = doc.data();
            data["playlistId"] = doc.id;
            playlists.push(data);
        });
      }).then(() => {
        dispatch({type: 'GET_PLAYLISTS_SUCCESS', playlists});
      });            
      } 
    });
  };
};
