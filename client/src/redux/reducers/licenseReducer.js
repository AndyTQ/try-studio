const initState = {
  licenseError: null,
  licenses: [],
};
  
const licenseReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_LICENSES_SUCCESS':
      return {
          ...state,
          licenseError: null,
          licenses: action.licenses,
      };
    case 'GET_LICENSES_ERROR':
      return {
          ...state,
          licenseError: action.err,
      };
    default:
      return state;
  }
};
  
export default licenseReducer;
