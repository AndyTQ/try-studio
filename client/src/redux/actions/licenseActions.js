export const getLicenses = (businessId) => {
  return async (dispatch, getState, { getFirebase }) => {
    // call the backend API endpoint.
    const endpoint = "http://localhost:5000/api/read/license" + (businessId ? `?business_id=${businessId}` : "")
    const licenseResponse = 
      await fetch(endpoint , {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(async res => {
      if(!res.ok) {
        const text = await res.text();
        dispatch({type: 'GET_LICENSES_ERROR', text});
      }
      else {
        // return res;
        res = await res.json();
        console.log(res);

        dispatch({
                type: 'GET_LICENSES_SUCCESS',
                licenses: res,
        });
      }   
    })
  };
};
