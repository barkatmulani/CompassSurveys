import { IOption } from ".";

export interface IQuestion {
    id: number;
    createdBy: string;
    createdDateTime: string;
    title: string;
    subTitle: string;
    questionType: number;
    options: IOption[];
};