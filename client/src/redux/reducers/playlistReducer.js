const initState = {
    playlistError: null,
    playlists: [],
  };
    
  const playlistReducer = (state = initState, action) => {
    switch (action.type) {
      case 'GET_PLAYLISTS_SUCCESS':
        return {
            ...state,
            licenseError: null,
            licenses: action.playlists,
        };
      case 'GET_PLAYLISTS_ERROR':
        return {
            ...state,
            licenseError: action.playlists,
        };
      default:
        return state;
    }
  };
    
  export default playlistReducer;
  