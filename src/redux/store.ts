import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducers, {RootReducer} from '~redux/reducers';
import rootSagas from '~redux/sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducers,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({thunk: false}).prepend(sagaMiddleware);
  },
});

sagaMiddleware.run(rootSagas);
export default store;
