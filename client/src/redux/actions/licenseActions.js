import { Businesses } from "../../components";

export const getLicenses = (businessId) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const ref = firebase.firestore();
    const usersRef = ref.collection("users");
    const userRef = usersRef.doc(firebase.auth().currentUser.uid);
    const licensesRef = ref.collection("licenses");
    
    userRef.onSnapshot(doc => {
      let licenseIds;
      let licenses = [];
      licenseIds = doc.data().licenses;
      if (licenseIds && licenseIds.length > 0){
        let filteredLicenses;
        
        if (!businessId) {
          filteredLicenses = licensesRef.where(firebase.firestore.FieldPath.documentId(), "in", licenseIds);
        } else {
          filteredLicenses = licensesRef.where(firebase.firestore.FieldPath.documentId(), "in", licenseIds).where(
            "business", "==", businessId
          )
        }
       
        filteredLicenses.get().then(snapshot => {
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
    });
  };
};
