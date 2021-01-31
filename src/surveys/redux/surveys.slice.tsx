import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchAllSurveys, fetchSurvey, fetchSurveyResult } from '../../api/apiServicce';
import { IOption, IQuestion, ISelectedOption, ISurvey, ISurveyResult, ISurveyResultOption, ISurveyResultQuestion, ISurveysState } from '../../models';
import { AppThunk } from '../../redux/store';

const initialState: ISurveysState = {
  userId: '',
  surveys: [],
  currentSurvey: {} as ISurvey,
  surveyResults: []
};

const mergeSurveyResult = (survey: ISurvey, surveyResult: ISurveyResult): ISurvey => {
  let survey2 = JSON.parse(JSON.stringify(survey));

  surveyResult.questions.forEach((srq: ISurveyResultQuestion) => {
      srq.options.forEach((sro: ISurveyResultOption) => {
          let question = survey2.questions && survey2.questions.find((q: IQuestion) => q.id === srq.id) as IQuestion;
          if (question) {
              let option = question.options.find((o: IOption) => o.id === sro.id) as IOption;
              option.isChecked = sro.isChecked;
          }
      })
  });

  return survey2;
};

const surveysSlice = createSlice({
  name: 'surveysSlice',
  initialState,
  reducers: {
      getSurveysSuccess(state: ISurveysState, action: PayloadAction<ISurvey[]>) {
        state.surveys = action.payload;
      },
      getSurveysFailed(state: ISurveysState, action: PayloadAction<string>) {
        state.surveys = []
      },

      getSurveySuccess(state: ISurveysState, action: PayloadAction<ISurvey>) {
        state.currentSurvey = action.payload
      },
      getSurveyFailed(state: ISurveysState, action: PayloadAction<string>) {
        state.currentSurvey = {} as ISurvey
      },
      setCurrentSurvey(state: ISurveysState, action: PayloadAction<ISurvey>) {
        state.currentSurvey = action.payload
      },

      getSurveyResultSuccess(state: ISurveysState, action: PayloadAction<ISurveyResult>) {
        const payload = action.payload;
        let surveyResult = state.surveyResults?.find((sr: ISurveyResult) => sr.userId === payload.userId && sr.id === payload.id);
        if (surveyResult) {
          surveyResult.questions = action.payload.questions;
        }
        else {
          state.surveyResults?.push(action.payload);
        }
        if (state.currentSurvey && action.payload) {
          state.currentSurvey = mergeSurveyResult(state.currentSurvey, action.payload);
        }
      },
      getSurveyResultFailed(state: ISurveysState, action: PayloadAction<string>) {
        state.surveys = []
      },

      setOptionSelection(state: ISurveysState, action: PayloadAction<ISelectedOption>) {
        const { surveyId, questionId, optionId } = action.payload;
        const survey = state.currentSurvey;// state.surveys.find(s => s.id === surveyId) as ISurvey;
        const question = survey.questions.find((q: IQuestion) => q.id === questionId) as IQuestion;
        const option = question.options.find((o: IOption) => o.id === optionId) as IOption;
        option.isChecked = !option.isChecked;

        let survey2 = state.surveyResults && state.surveyResults?.find((s: ISurveyResult) => s.id === surveyId) as ISurveyResult;
        if (!survey2) {
          survey2 = ({ userId: state.userId, id: surveyId, questions: [] } as ISurveyResult);
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

      setUserId(state: ISurveysState, action: PayloadAction<string>) {
        state.userId = action.payload;
      }
  }
});

export const { getSurveysSuccess, getSurveysFailed, getSurveySuccess, getSurveyFailed, setCurrentSurvey, getSurveyResultSuccess, getSurveyResultFailed, setOptionSelection, setUserId } = surveysSlice.actions;

export const getSurveys = (): AppThunk =>
  async dispatch => {
    await fetchAllSurveys()
      .then((survey: ISurvey[]) => dispatch(getSurveysSuccess(survey)),
            (err: any) => dispatch(getSurveysFailed(err.toString())))
    }

export const getSurvey = (userId: string, id: number, surveyResult: ISurveyResult): AppThunk =>
  async dispatch => {
    await fetchSurvey(id)
      .then((survey: ISurvey) => {
        if (surveyResult) {
          survey = mergeSurveyResult(survey, surveyResult);
        }
        else {
          dispatch(getSurveyResult(userId, id));
        }

        dispatch(getSurveySuccess(survey));
      },
      (err: any) => dispatch(getSurveyFailed(err.toString())))
    }

export const getSurveyResult = (userId: string, id: number): AppThunk =>
  async dispatch => {
    await fetchSurveyResult(userId, id)
        .then((result: ISurveyResult) => dispatch(getSurveyResultSuccess(result)),
              (err: any) => dispatch(getSurveysFailed(err.toString())))
    }

export default surveysSlice.reducer;