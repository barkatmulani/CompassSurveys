import { createSelector } from 'reselect';
import { ISurveysState } from '../../models';
import { RootState } from '../../redux/rootReducer';

const surveysSelector = (state: RootState) => state.compassSurveys;

export const selectSurveys: any = createSelector(
    [surveysSelector],
    (state: ISurveysState) => state.surveys
);

export const selectCurrentSurvey: any = createSelector(
    [surveysSelector],
    (state: ISurveysState) => state.currentSurvey
);

export const selectSurveyResults: any = createSelector(
    [surveysSelector],
    (state: ISurveysState) => state.surveyResults
);

export const selectUserId: any = createSelector(
    [surveysSelector],
    (state: ISurveysState) => state.userId
);