import { Businesses } from "../../components";

export const getLicenses = (businessId) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const licensesRef = firebase.firestore().collection("licenses");
    firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).onSnapshot(doc => {
      let licenses = [];
      let licenseIds = doc.data().licenses
      if (licenseIds && licenseIds.length > 0){
        let filteredLicenses = (!businessId) ? licensesRef.where(firebase.firestore.FieldPath.documentId(), "in", licenseIds)
        : licensesRef.where(firebase.firestore.FieldPath.documentId(), "in", licenseIds).where(
          "business", "==", businessId
        ); 
        filteredLicenses.get().then(snapshot => {
          snapshot.forEach(doc => {
            let data = doc.data();
            data["licenseId"] = doc.id;
            licenses.push(data);
        });
      }).then(() => {
        dispatch({type: 'GET_LICENSES_SUCCESS', licenses,});
      });            
      } 
    });
  };
};
