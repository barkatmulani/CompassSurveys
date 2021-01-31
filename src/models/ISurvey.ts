import { IQuestion } from ".";

export interface ISurvey {
    id: number;
    name: string;
    questions: IQuestion[];
};