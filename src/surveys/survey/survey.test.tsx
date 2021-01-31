import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import { findByTestAttr, storeFactory } from '../../../test/testUtils';
import Survey from './survey.component';
import { IQuestion, ISurvey, ISurveysState } from '../../models';
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new EnzymeAdapter() })

const survey1: ISurvey = { id: 1, name: 'Survey 1',
  questions: [{ id: 1, title: 'Question 1', subTitle: 'Question 1', questionType: 3, createdBy: '', createdDateTime: '',
                options: [ { id: 1, text: 'Option 1' }, { id: 2, text: 'Option 2' } ] },
              { id: 2, title: 'Question 2', subTitle: 'Question 2', questionType: 3, createdBy: '', createdDateTime: '',
                options: [ { id: 1, text: 'Option 1' }, { id: 2, text: 'Option 2' } ] }
  ]
};

const setup = (initialState = {}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(
      <Provider store={store}>
        <Survey />
      </Provider>
    ).dive().dive().dive().dive();
  return wrapper;
};

describe('renders', () => {
  const initialState: any = {
    compassSurveys: {
      userId: '123',
      surveys: [survey1],
      currentSurvey: survey1,
      surveyResults: []
    } as ISurveysState
  };

  const wrapper = setup(initialState);

  test('renders the survey properly', () => {
    const component = findByTestAttr(wrapper, 'survey');
    expect(component.length).toBe(1);
  });

  test('renders correct number of questions', () => {
    const component = findByTestAttr(wrapper, 'question');
    expect(component.length).toBe(survey1.questions.length);
  });

  test('renders correct number of options', () => {
    const component = findByTestAttr(wrapper, 'option');
    let totalOptions = 0;
    survey1.questions.forEach((q: IQuestion) => totalOptions += q.options.length)
    expect(component.length).toBe(totalOptions);
  });

  // test('clicking on an option changes state', () => {
  //   let store = storeFactory(initialState);

  //   const wrapper = shallow(
  //         <Provider store={store}>
  //           <Survey />
  //         </Provider>).dive().dive().dive().dive();

  //   //const wrapper = mount(<Survey store={store} />);
  //   const component = findByTestAttr(wrapper, 'option').last()//.find((x: any) => x.id === 2);
  //   console.log(component)
  //   component.simulate('click');
  //   console.log('------------------------------------------------- after click')
  //   const surveyResults: any = store.getState().compassSurveys?.surveyResults;
  //   console.log(surveyResults)//[0].questions[0].options)
  // });
});
