import { configureStore, Action } from '@reduxjs/toolkit';
import { ThunkAction } from 'redux-thunk';

import rootReducer, { RootState } from './rootReducer';
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

const store = configureStore({
  reducer: rootReducer
});

let mod: any = module;

if (process.env.NODE_ENV === 'development' && mod.hot) {
  mod.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default;
    store.replaceReducer(newRootReducer);
  });
}

export default store;