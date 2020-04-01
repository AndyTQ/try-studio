import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './redux/reducers/rootReducer'
import { getFirebase } from 'react-redux-firebase'

export default function configureStore (initialState, history) {
  const middleware = [
    thunk.withExtraArgument({ getFirebase })
  ]
  const createStoreWithMiddleware = compose(
    applyMiddleware(...middleware),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? () => window.__REDUX_DEVTOOLS_EXTENSION__ : f => f
  )(createStore)
  const store = createStoreWithMiddleware(rootReducer)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./redux/reducers/rootReducer', () => {
      const nextRootReducer = require('./redux/reducers/rootReducer')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}