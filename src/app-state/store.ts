import { createStore, Store, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { AppState, reducer } from './reducer';
import { rootSaga } from './root-saga';

const sagaMiddleware = createSagaMiddleware();

const store: Store<AppState> = createStore(reducer, applyMiddleware(sagaMiddleware));

export default store;

sagaMiddleware.run(rootSaga);
