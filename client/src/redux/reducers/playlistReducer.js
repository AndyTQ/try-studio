const initState = {
    playlistError: null,
    playlists: [],
  };
    
  const playlistReducer = (state = initState, action) => {
    switch (action.type) {
      case 'GET_PLAYLISTS_SUCCESS':
        return {
            ...state,
            playlistError: null,
            playlists: action.playlists,
        };
      case 'GET_PLAYLISTS_ERROR':
        return {
            ...state,
            playlistError: action.err,
        };
      default:
        return state;
    }
  };
    
  export default playlistReducer;
  