export const getPlaylists = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const playlistsRef = firebase.firestore().collection("playlists");
    firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).onSnapshot(doc => {
      let playlists = [];
      let playlistIds = doc.data().playlists;
      if (playlistIds && playlistIds.length > 0) {
        let playlistRefs = playlistsRef.where(firebase.firestore.FieldPath.documentId(), "in", playlistIds)
        playlistRefs.get().then(snapshot => {
          snapshot.forEach(doc => {
            let data = doc.data();
            playlists.push(data);
        });
      }).then(() => {
        dispatch({type: 'GET_PLAYLISTS_SUCCESS', playlists});
      });            
      } 
    });
  };
};
