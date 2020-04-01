import React from 'react';
import Routes from './Routes';

// redux packages
import { Provider, useSelector } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import configureStore from './store';

// firebase config
import { firebase as fbConfig, reduxFirebase as rfConfig} from './config';

// firebase packages
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore'; // for firestore
import { isLoaded } from 'react-redux-firebase'

const initialState = window && window.__INITIAL_STATE__; // set initial state here
const store = configureStore(initialState);

firebase.initializeApp(fbConfig);

function AuthIsLoaded({children}){
  const auth = useSelector(state => state.firebase.auth)
  if (!isLoaded(auth)) return <></>;
  return children
}

export default function App () {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider
        firebase={firebase}
        config={rfConfig}
        dispatch={store.dispatch}
        createFirestoreInstance={createFirestoreInstance}>
        <AuthIsLoaded>
          <Routes />
        </AuthIsLoaded>
      </ReactReduxFirebaseProvider>
    </Provider>
  )
}
