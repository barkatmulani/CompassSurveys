import React from 'react';
import { connect } from "react-redux";
import { IOption, IQuestion, ISelectedOption, ISurvey, ISurveyResult } from "../../models";
import { selectCurrentSurvey, selectSurveys, selectSurveyResults, selectUserId } from "../redux/surveys.selectors";
import { getSurvey, setOptionSelection, setCurrentSurvey } from '../redux/surveys.slice'
import './survey.styles.scss';

class Survey extends React.Component<any,any> {
    constructor(props: any) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    componentDidMount() {
        const { getSurvey, userId, location, surveyResults } = this.props;

        if (location) {
            const locArray = location.pathname.split('/');
            const id = parseInt(locArray[locArray.length - 1]);
            const surveyResult = surveyResults && surveyResults.find((sr: ISurveyResult) => sr.id === id);
            getSurvey(userId || '123456', id, surveyResult);
        }
    }

    handleInputChange(question: IQuestion, option: IOption, event: any) {
        //event.stopPropagation();
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
                                                        checked={option.isChecked}
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
        userId: selectUserId(state),
        surveys: selectSurveys(state),
        currentSurvey: selectCurrentSurvey(state),
        surveyResults: selectSurveyResults(state)
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        getSurvey: (userId: string, id: number, surveyResult: ISurveyResult) => dispatch(getSurvey(userId, id, surveyResult)),
        setCurrentSurvey: (survey: ISurvey) => dispatch(setCurrentSurvey(survey)),
        setOptionSelection: (selectedOption: ISelectedOption) => dispatch(setOptionSelection(selectedOption))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Survey);
