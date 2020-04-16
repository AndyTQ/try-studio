export const signIn = (credentials) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const firestore = firebase.firestore();
        let currUser = null;
        
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then((resp) => {
            return firestore.collection('users').doc(resp.user.uid).get().then(
                (doc) => {
                    if (doc.exists){
                        currUser = doc.data();
                        dispatch({type: 'LOGIN_SUCCESS', currUser});
                    }
                }
            ).catch((err) => {
                dispatch({type: 'LOGIN_ERROR', err});
            });
        }).catch((err) => {
            dispatch({type: 'LOGIN_ERROR', err});
        })
    };
};


export const getUser = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const firestore = firebase.firestore();
        let currUser = null;
        firestore.collection('users').doc(firebase.auth().currentUser.uid).get().then(
            (doc) => {
                if (doc.exists){
                    currUser = doc.data();
                    dispatch({type: 'RETRIEVE_SUCCESS', currUser});
                }
            }
        ).catch((err) => {
            dispatch({type: 'LOGRETRIEVE_ERROR', err});
        });
    };
};

export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signOut().then(() => {
            dispatch({type: 'SIGNOUT_SUCCESS'});
        });
    };
};

export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const firestore = firebase.firestore();
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((resp) => {
            return firestore.collection('users').doc(resp.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
            }).then(() => {
                dispatch({ type: 'SIGNUP_SUCCESS'})
            }).catch(err => {
                dispatch({ type: 'SIGNUP_ERROR', err})
            })
        }).catch(err => {
            dispatch({ type: 'SIGNUP_ERROR', err})
        })
    };
};
