import React from 'react';
import './app.scss';
import SurveysRouter from './surveys/surveys.router';
import { connect } from 'react-redux';
import { setUserId, getSurveys } from './surveys/redux/surveys.slice';
import { ISurvey } from './models';
import { selectUserId } from './surveys/redux/surveys.selectors';

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    props.setUserId('123456');
    props.getSurveys();
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

const mapStateToProps = (state: any) => {
  return {
      userId: selectUserId(state)
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setUserId: (userId: string) => dispatch(setUserId(userId)),
    getSurveys: () => dispatch(getSurveys())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
