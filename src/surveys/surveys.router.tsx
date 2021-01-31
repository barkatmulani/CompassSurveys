import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import Main from './main/main.component';
import Survey from './survey/survey.component';

const SurveysRouter: React.FC = () => {
    return (
        <div>
            <Router>
                <div>
                    <Switch>
                        <Route path="/" exact>
                            <Redirect to="/surveys" />
                        </Route>
                        <Route path="/surveys" component={Main} />
                        <Route path="/survey/:id" component={Survey} />
                    </Switch>
                </div>
            </Router>
        </div>
    );
};

export default SurveysRouter;