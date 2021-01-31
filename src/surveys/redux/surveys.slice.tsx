import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IOption, IQuestion, ISelectedOption, ISurvey, ISurveyResult, ISurveyResultOption, ISurveyResultQuestion, ISurveysState } from '../../models';

const initialState: ISurveysState = {
  surveys: [],
  currentSurvey: {} as ISurvey,
  surveyResults: []
};

const surveysSlice = createSlice({
  name: 'surveysSlice',
  initialState,
  reducers: {
      setSurveys(state: ISurveysState, action: PayloadAction<ISurvey[]>) {
        state.surveys = action.payload;
      },

      setCurrentSurvey(state: ISurveysState, action: PayloadAction<ISurvey>) {
        state.currentSurvey = action.payload
      },

      setOptionSelection(state: ISurveysState, action: PayloadAction<ISelectedOption>) {
        const { surveyId, questionId, optionId } = action.payload;
        const survey = state.currentSurvey;// state.surveys.find(s => s.id === surveyId) as ISurvey;
        const question = survey.questions.find((q: IQuestion) => q.id === questionId) as IQuestion;
        const option = question.options.find((o: IOption) => o.id === optionId) as IOption;
        option.isChecked = !option.isChecked;

        let survey2 = state.surveyResults?.find((s: ISurveyResult) => s.id === surveyId) as ISurveyResult;
        if (!survey2) {
          survey2 = ({ id: surveyId, questions: [] } as ISurveyResult);
          state.surveyResults?.push(survey2);
        }

        let question2 = survey2.questions?.find((q: ISurveyResultQuestion) => q.id === questionId) as ISurveyResultQuestion;
        if (!question2) {
          question2 = { id: questionId, options: [] } as ISurveyResultQuestion;
          survey2.questions?.push(question2);
        }

        let option2 = question2.options.find((o: ISurveyResultOption) => o.id === optionId) as ISurveyResultOption;
        if (option2) {
          option2.isChecked = !option2.isChecked;
        }
        else {
          question2.options.push({ id: optionId, isChecked: true });
        }
      },

      setSurveyResult(state: ISurveysState, action: PayloadAction<ISurveyResult>) {
        let surveyResult = state.surveyResults?.find((sr: ISurveyResult) => sr.id === action.payload.id);
        if (surveyResult) {
          surveyResult.questions = action.payload.questions;
        }
        else {
          state.surveyResults?.push(action.payload);
        }
      }
  }
});

export const { setSurveys, setCurrentSurvey, setOptionSelection, setSurveyResult } = surveysSlice.actions;

export default surveysSlice.reducer;
