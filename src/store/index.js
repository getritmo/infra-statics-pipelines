import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import allReducers from 'reducers'

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        name: 'MyApp',
        actionsBlacklist: ['REDUX_STORAGE_SAVE'],
      })
    : compose

const enhancer = composeEnhancers(applyMiddleware(thunk))

const store = createStore(allReducers, enhancer)

export default store
