import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './app';
import store from './redux/store';

import { storeFactory } from '../test/testUtils';
import { Provider } from 'react-redux';

const setup = (initialState = []) => {
  const store = storeFactory(initialState);
}
test('renders compass education as heading', () => {
  render(<Provider store={store}>
            <App />
          </Provider>);
  const linkElement = screen.getByText(/Compass Education/i);
  expect(linkElement).toBeInTheDocument();
});
