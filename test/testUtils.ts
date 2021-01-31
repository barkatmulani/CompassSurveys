import { createStore } from '@reduxjs/toolkit';

import rootReducer from '../src/redux/rootReducer';

export const findByTestAttr = (wrapper: any, val: string) => {
  return wrapper.find(`[test-data="${val}"]`);
};

export const storeFactory = (initialState: any) => {
  return createStore(rootReducer, initialState);
};
