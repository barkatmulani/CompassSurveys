import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { storeFactory } from '../../../test/testUtils';
import { IOption, IQuestion, ISelectedOption, ISurvey, ISurveyResult, ISurveysState } from '../../models';
import Main from '../main/main.component';

Enzyme.configure({ adapter: new EnzymeAdapter() })

import reducer, { setSurveys, setCurrentSurvey, setOptionSelection, setSurveyResult } from './surveys.slice';

// const setup = (initialState = []) => {
//   const store = storeFactory(initialState);
//   const wrapper = shallow(
//     <Provider store={store}>
//       <Main />
//     </Provider>
//   );
// };

describe('reducers', () => {
  const initialState = undefined;

  const emptyState: ISurveysState = {
    surveys: [],
    currentSurvey: {} as ISurvey,
    surveyResults: []
  };


  //#region ***** Declarations *****

  const survey1: ISurvey = { id: 1, name: 'Survey 1',
    questions: [ { id: 1, title: 'Question 1', subTitle: 'Question 1', questionType: 3, createdBy: '', createdDateTime: '',
      options: [ { id: 1, text: 'Option 1' }, { id: 2, text: 'Option 2' } ]
    }]
  };
  const survey2: ISurvey = { id: 1, name: 'Survey 2', questions: [] };

  const surveys: ISurvey[] = [ survey1, survey2 ] as ISurvey[];
  
  const surveyResult1: ISurveyResult = {
    id: 1,
    questions: [{ id: 1,
      options: [{ id: 1, isChecked: true }, { id: 2, isChecked: true }]
    }]
  };

  const surveyResult2: ISurveyResult = {
    id: 2,
    questions: [{ id: 1,
      options: [{ id: 1, isChecked: true }, { id: 2, isChecked: true }]
    }]
  };

  //#endregion


  //#region ***** Tests *****

  test('should return the empty state on first run', () => {
    const result = reducer(initialState, {} as any);
    expect(result).toEqual(emptyState);
  });

  test('setSurveys: correctly sets the "surveys" array', () => {
    let result =  reducer(initialState, setSurveys(surveys));
    expect(result.surveys.length).toBe(surveys.length);
  });

  test('setCurrentSurvey: correctly sets the "currentSurvey" value', () => {
    let result =  reducer(initialState, setCurrentSurvey(survey1));
    expect(result.currentSurvey).toEqual(survey1);
  });
  
  test('setSurveyResult: correctly adds item to the "surveyResults" array', () => {
    const initialState: ISurveysState = {
      surveys: [],
      currentSurvey: {} as ISurvey,
      surveyResults: [surveyResult1]
    };
    
    let result =  reducer(initialState, setSurveyResult(surveyResult2));
    expect(result.surveyResults?.length).toBe(2)
  });

  test('setOptionSelection: correctly sets the selected option. Adds item to "surveyResults" array \
        and set isChange option value of the corresponding "surveyResults" array item', () => {
    const initialState: ISurveysState = {
      surveys: [survey1],
      currentSurvey: survey1,
      surveyResults: []
    };

    const selectedOption: ISelectedOption = {surveyId: 1, questionId: 1, optionId: 1};

    let result =  reducer(initialState, setOptionSelection(selectedOption));
    expect(result.surveyResults?.length).toBe(1);

    const question = result.currentSurvey.questions.find((q: IQuestion) => q.id === selectedOption.questionId);
    const option = question?.options.find((option: IOption) => option.id === selectedOption.optionId);
    expect(option?.isChecked).toBe(true);
  });

  //#endregion
});