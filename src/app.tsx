import React from 'react';
import './app.scss';
import { connect } from 'react-redux';
import { setUserId, getSurveys } from './surveys/redux/surveys.slice';
import { selectUserId } from './surveys/redux/surveys.selectors';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Main from './surveys/main/main.component';
import Survey from './surveys/survey/survey.component';

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  async componentDidMount() {
    this.props.setUserId('123456');
    await this.props.getSurveys();
  }

  render() {
    return (
      <div className="container" test-data="application">
        <h2 className="text-center">Compass Education</h2>
        
        <div className="container-fluid row">
          <div className="col-12">
            <Router>
              <Switch>
                <Route path="/" exact>
                    <Redirect to="/surveys" />
                </Route>
                <Route path="/surveys" component={Main} />
                <Route path="/survey/:id" component={Survey} />
              </Switch>
            </Router>
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
