import { ISurvey, ISurveyResult } from '../models';
import { surveyResults, surveys } from './data';

const USER_ID = '123456';

export const getUserID = (): string => {
    return USER_ID;
}

export const fetchAllSurveys = (): Promise<ISurvey[]> => {
    return new Promise((resolve) => {
        setTimeout(
            () => resolve(surveys.map((survey: ISurvey) => ({ id: survey.id, name: survey.name, questions: [] }))),
            100);
    });
};

export const fetchSurvey = (id: number): Promise<ISurvey> => {
    return new Promise((resolve) => {
        setTimeout(
            () => resolve(surveys.find((survey: ISurvey) => survey.id === id) as ISurvey),
            100);
    });
};

export const fetchSurveyResult = (userId: string, id: number): Promise<ISurveyResult> => {
    return new Promise((resolve) => {
        setTimeout(
            () => resolve(surveyResults.find((surveyResult: ISurveyResult) => surveyResult.userId === userId && surveyResult.id === id) as ISurveyResult),
            100);
    });
};