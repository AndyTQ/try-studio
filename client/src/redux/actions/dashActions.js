export const getBusinesses = () => {
  return async (dispatch, getState, { getFirebase }) => {
    // call the backend API endpoint.
    const businessResponse = 
      await fetch("http://localhost:5000/api/read/business", {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(async res => {
      if(!res.ok) {
        const text = await res.text();
        dispatch({type: 'GET_BUSINESSES_ERROR', text});
      }
      else {
        // return res;
        res = await res.json();
        console.log(res);

        dispatch({
                type: 'GET_BUSINESSES_SUCCESS',
                businesses: res,
        });
      }   
    })
  };
};
