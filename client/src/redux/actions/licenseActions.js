export const getLicenses = () => {
    return (dispatch, getState, { getFirebase }) => {
      const firebase = getFirebase();
      const ref = firebase.firestore();
      const usersRef = ref.collection("users");
      const userRef = usersRef.doc(firebase.auth().currentUser.uid);
      const licensesRef = ref.collection("licenses");
      let licenseIds;
      let licenses = [];
      
      userRef.get().then(doc => {
        licenseIds = doc.data().licenses;
      }).catch(err => {
        dispatch({type: 'GET_LICENSES_ERROR', err});
      }).then((doc, err) => {
        if (licenseIds){
          licensesRef.where(firebase.firestore.FieldPath.documentId(), "in", licenseIds).get().then(snapshot => {
            snapshot.forEach(doc => {
              let data = doc.data();
              data["licenseId"] = doc.id;
              licenses.push(data);
            });
          }).catch(err => {
            dispatch({type: 'GET_LICENSES_ERROR', err});
          }).then(() => {
            dispatch({
              type: 'GET_LICENSES_SUCCESS',
              licenses,
            });
          });
        }
        else{
          dispatch({type: 'GET_LICENSES_ERROR', err}); // The user doesn't have any licenses.
        }
      });
    };
  };
  