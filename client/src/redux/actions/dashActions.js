export const getBusinesses = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const ref = firebase.firestore();
    const usersRef = ref.collection("users");
    const userRef = usersRef.doc(firebase.auth().currentUser.uid);
    const businessesRef = ref.collection("businesses");
    
    userRef.onSnapshot(doc => {
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
