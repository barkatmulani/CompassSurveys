export interface ISurveyResult {
    userId: string;
    id: number;
    questions: ISurveyResultQuestion[];
};

export interface ISurveyResultQuestion {
    id: number,
    options: ISurveyResultOption[];
}

export interface ISurveyResultOption {
    id: number;
    isChecked?: boolean;
}