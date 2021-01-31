import React from 'react';
import './app.scss';
import { getAllSurveys } from './api/apiServicce';
import SurveysRouter from './surveys/surveys.router';
import { connect } from 'react-redux';
import { setSurveys } from './surveys/redux/surveys.slice';
import { ISurvey } from './models';

class App extends React.Component {
  constructor(props: any) {
    super(props);
    const surveys = getAllSurveys();
    props.setSurveys(surveys);
  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center">Compass Education</h2>
        
        <div className="container-fluid row">
          <div className="col-12">
            <SurveysRouter></SurveysRouter>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    setSurveys: (surveys: ISurvey[]) => dispatch(setSurveys(surveys))
  };
}

export default connect(null, mapDispatchToProps)(App);
