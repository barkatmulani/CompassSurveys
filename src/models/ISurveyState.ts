import { ISurvey } from ".";
import { ISurveyResult } from "./ISurveyResult";

export interface ISurveysState {
    surveys: ISurvey[];
    currentSurvey: ISurvey;
    surveyResults?: ISurveyResult[];
};