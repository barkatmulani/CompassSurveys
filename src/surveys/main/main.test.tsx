import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import { findByTestAttr, storeFactory } from '../../../test/testUtils';
import Main from './main.component';
import { Provider } from 'react-redux';
import { ISurvey, ISurveysState } from '../../models';

Enzyme.configure({ adapter: new EnzymeAdapter() })

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(
    <Provider store={store}>
      <Main />
    </Provider>).dive().dive().dive().dive();
  return wrapper;
};

describe('renders', () => {
  const surveys: ISurvey[] = [
    { id: 1, name: 'Survey 1', questions: [] },
    { id: 2, name: 'Survey 2', questions: [] },
    { id: 3, name: 'Survey 3', questions: [] }
  ];

  const initialState: any = {
    compassSurveys: {
      userId: '',
      surveys,
      currentSurvey: {} as ISurvey,
      surveyResults: []
    } as ISurveysState
  };

  const wrapper = setup(initialState);

  test('renders component without error', () => {
    const component = findByTestAttr(wrapper, "survey-list")
    expect(component.length).toBe(1);
  });

  test('renders correct number of survey buttons', () => {
    const component = findByTestAttr(wrapper, "survey-button")
    expect(component.length).toBe(surveys.length );
  });
});
