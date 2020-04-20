import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import authReducer from './authReducer';
import dashReducer from './dashReducer';
import licenseReducer from './licenseReducer';
import playlistReducer from './playlistReducer';

const rootReducer = combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  auth: authReducer,
  dash: dashReducer,
  license: licenseReducer,
  playlist: playlistReducer
});

export default rootReducer;