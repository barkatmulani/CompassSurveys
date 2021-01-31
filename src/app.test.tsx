import React from 'react';
import App from './app';

import { findByTestAttr, storeFactory } from '../test/testUtils';
import { Provider } from 'react-redux';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new EnzymeAdapter() })

test('renders component without error', () => {
  const store = storeFactory({
    compassSurveys: {
      userId: '',
      surveys: [],
      currentSurvey: {},
      surveyResults: []
    }
  });
  const wrapper = shallow(
          <Provider store={store}>
            <App />
          </Provider>).dive().dive().dive().dive();
  const component = findByTestAttr(wrapper, 'application');
  expect(component.length).toBe(1);
});
