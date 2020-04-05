const initState = {
  dashError: null,
  businesses: [],
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_BUSINESSES_SUCCESS':
      return {
        ...state,
        dashError: null,
        businesses: action.businesses,
      };
    case 'GET_BUSINESSES_ERROR':
      return {
        ...state,
        dashError: action.err,
      };
    default:
      return state;
  }
};

export default authReducer;