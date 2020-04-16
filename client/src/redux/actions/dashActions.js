export const getBusinesses = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const ref = firebase.firestore();
    const usersRef = ref.collection("users");
    const userRef = usersRef.doc(firebase.auth().currentUser.uid);
    const businessesRef = ref.collection("businesses");
    let businessIds;
    let businesses = [];
    
    userRef.get().then(doc => {
      businessIds = doc.data().businesses;
    }).catch(err => {
      dispatch({type: 'GET_BUSINESSES_ERROR', err});
    }).then((doc, err) => {
      if (businessIds){
      businessesRef.where(firebase.firestore.FieldPath.documentId(), "in", businessIds).get().then(snapshot => {
        snapshot.forEach(doc => {
          businesses.push(doc.data());
        });
      }).catch(err => {
        dispatch({type: 'GET_BUSINESSES_ERROR', err});
      }).then(() => {
        dispatch({
          type: 'GET_BUSINESSES_SUCCESS',
          businesses,
        });
      });            
      } 
      else{
        dispatch({type: 'GET_LICENSES_ERROR', err}); // The user doesn't have any licenses.
      }
    });
  };
};
