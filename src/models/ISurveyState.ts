import { ISurvey } from ".";
import { ISurveyResult } from "./ISurveyResult";

export interface ISurveysState {
    userId: string;
    surveys: ISurvey[];
    currentSurvey: ISurvey;
    surveyResults?: ISurveyResult[];
};