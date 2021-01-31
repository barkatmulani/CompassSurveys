import { IOption, IQuestion, ISurvey, ISurveyResult } from '../models';
import { surveyResult, surveys } from './data';

export const getAllSurveys = () => {
    return surveys.map((survey: ISurvey) => ({ id: survey.id, name: survey.name }));
    // .map((s: ISurvey) => {
    //     return { ...s, questions: s.questions.map((q: IQuestion) => {
    //         return { ...q, options: q.options.map((o: IOption) => {
    //             return { ...o, checked: !!o.checked }
    //         }) }
    //     }) }
    // });
};

export const getSurvey = (id: number): Promise<ISurvey> => {
    return new Promise((resolve) => {
        resolve(surveys.find((survey: ISurvey) => survey.id === id) as ISurvey);
    });
};

export const getSurveyResult = (id: number): Promise<ISurveyResult> => {
    return new Promise((resolve) => {
        resolve(surveyResult.find((surveyResult: ISurveyResult) => surveyResult.id === id) as ISurveyResult);
    });
};