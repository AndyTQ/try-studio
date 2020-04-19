export const getBusinesses = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const usersRef = firebase.firestore().collection("users");
    const businessesRef = firebase.firestore().collection("businesses");
    usersRef.doc(firebase.auth().currentUser.uid).onSnapshot(doc => {
      let businessIds;
      let businesses = [];
      businessIds = doc.data().businesses;
      if (businessIds && businessIds.length > 0){
        businessesRef.where(firebase.firestore.FieldPath.documentId(), "in", businessIds).get().then(snapshot => {
          console.log("Updating getBusiness from redux...")
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
    });
  };
};
