import React from 'react';
import { connect } from "react-redux";
import { getSurvey, getSurveyResult } from "../../api/apiServicce";
import { IOption, IQuestion, ISelectedOption, ISurvey, ISurveyResult, ISurveyResultOption, ISurveyResultQuestion } from "../../models";
import { selectCurrentSurvey, selectSurveys, selectSurveyResults } from "../redux/surveys.selectors";
import { setCurrentSurvey, setOptionSelection, setSurveyResult } from '../redux/surveys.slice'
import './survey.styles.scss';

class Survey extends React.Component<any,any> {
    constructor(props: any) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    async componentDidMount() {
        let survey: ISurvey = {} as ISurvey;
        let id: number;

        if (this.props.location) {
            const locArray = this.props.location.pathname.split('/');
            id = parseInt(locArray[locArray.length - 1]);
            survey = await getSurvey(id);

            let surveyResult = this.props.surveyResults && this.props.surveyResults.find((sr: ISurveyResult) => sr.id == id);
            if (!surveyResult) {
                surveyResult = await getSurveyResult(id);
                this.props.setSurveyResult(surveyResult);
                survey = this.mergeSurveyResult(survey, surveyResult);
            }

            if (surveyResult) {
                survey = this.mergeSurveyResult(survey, surveyResult);
            }

            if (Object.keys(survey).length) {
                this.props.setCurrentSurvey(survey);
            }
        }
    }

    mergeSurveyResult(survey: ISurvey, surveyResult: ISurveyResult): ISurvey {
        let survey2 = JSON.parse(JSON.stringify(survey));

        surveyResult.questions.forEach((srq: ISurveyResultQuestion) => {
            srq.options.forEach((sro: ISurveyResultOption) => {
                let question = survey2.questions.find((q: IQuestion) => q.id === srq.id) as IQuestion;
                if (question) {
                    let option = question.options.find((o: IOption) => o.id === sro.id) as IOption;
                    option.isChecked = sro.isChecked;
                }
            })
        });

        return survey2;
    }

    handleInputChange(question: IQuestion, option: IOption, event: any) {
        event.stopPropagation();
        this.props.setOptionSelection({surveyId: this.props.currentSurvey.id, questionId: question.id, optionId: option.id } as ISelectedOption);
    };

    handleBack() {
        this.props.history.push('/surveys');
    }

    componentWillUnmount() {
        this.props.setCurrentSurvey(null);
    }

    render() {
        if (!this.props.currentSurvey)
            return null;

        const { name, questions } = this.props.currentSurvey;
    
        return (
            <div test-data="survey">
                <h4 className="mt-4">{name}</h4>
                {
                    questions && questions.map((question: IQuestion, q: number) => {
                        return (
                            <div key={q} test-data="question" className="mt-4 p-3 border border-dark rounded">
                                <h6>Question {q + 1}</h6>
                                <label>{question.title}</label>
                                {question.options && question.options.map((option: IOption, o: number) => {
                                    return (
                                        <div key={o} className="">
                                            <label>
                                                <input  type="checkbox"
                                                        test-data="option"
                                                        defaultChecked={option.isChecked}
                                                        onChange={(e) => this.handleInputChange(question, option, e)} />
                                                &nbsp;
                                                {option.text}
                                            </label>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })
                }

                <div className="panel my-4">
                    <button className="btn btn-secondary" onClick={() => this.handleBack()}>Back</button>
                </div>

            </div>
        );
    }
};

const mapStateToProps = (state: any) => {
    return {
        surveys: selectSurveys(state),
        currentSurvey: selectCurrentSurvey(state),
        surveyResults: selectSurveyResults(state)
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        setCurrentSurvey: (survey: ISurvey) => dispatch(setCurrentSurvey(survey)),
        setOptionSelection: (selectedOption: ISelectedOption) => dispatch(setOptionSelection(selectedOption)),
        setSurveyResult: (surveyResults: ISurveyResult) => dispatch(setSurveyResult(surveyResults))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Survey);
