import React from 'react';
import { connect } from "react-redux";
import { ISurvey, ISurveysState } from "../../models";
import { selectSurveys } from '../redux/surveys.selectors';

import './main.styles.scss';

class Main extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick = (survey: ISurvey) => {
        this.props.history.push(`/survey/${survey.id}`);
    };

    render() {
        let surveys: ISurvey[]  = this.props.surveys;

        return (
            <div test-data="survey-list">
                <h3 className="my-3">Compass Surveys</h3>
                {
                    surveys && surveys.map((survey: ISurvey) =>
                        <button key={survey.id}
                                test-data="survey-button"
                                className="btn btn-primary col-12 my-2"
                                onClick={() => this.handleClick(survey)}>
                                    {survey.name}
                        </button>
                    )
                }
            </div>
        );
    }
}

const mapStateToProps = (state: ISurveysState) => {
    return {
        surveys: selectSurveys(state)
    }
};

export default connect(mapStateToProps)(Main);
