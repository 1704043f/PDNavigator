import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Homepage from './pages/home';
import CurrentTreatment from './pages/treatment';
import User from './pages/user';
import Result from './pages/results';
import TreatmentInfo from './pages/treatmentInfo';
import UserInfo from './pages/userinfo';
import NotFound from './pages/notFound';
import Symptom from './pages/symptom';

import InfoDBS from './infoFiles/DBS'
import InfoApomorphine from './infoFiles/Apomorphine.js'
import InfoDuopa from './infoFiles/Duopa.js'
import InfoRytary from './infoFiles/Rytary.js'
import InfoNuplazid from './infoFiles/Nuplazid.js'
import InfoDroxidopa from './infoFiles/Droxidopa.js'
import InfoBotTox from './infoFiles/BotTox.js'
import InfoSpark from './infoFiles/SPARK.js'
import InfoNilo from './infoFiles/NILO.js'
import Stepper from './components/stepper';

import { connect } from 'react-redux';
import { updateStepperCount } from './actions/Stepper';
class Routes extends Component {
    
    render() {
        return (
            <div>

                <Switch>
                    <Route path='/symptom' render={props => <Symptom {...this.props}></Symptom>} />
                    <Route path='/user' component={User} />
                    <Route path="/info_dbs" render={props => <InfoDBS {...this.props}></InfoDBS>} />
                    <Route path="/info_apomorphine" render={props => <InfoApomorphine {...this.props}></InfoApomorphine>} />
                    <Route path="/info_duopa" render={props => <InfoDuopa {...this.props}></InfoDuopa>} />
                    <Route path="/info_rytary" render={props => <InfoRytary {...this.props}></InfoRytary>} />
                    <Route path="/info_nuplazid" render={props => <InfoNuplazid {...this.props}></InfoNuplazid>} />
                    <Route path="/info_droxidopa" render={props => <InfoDroxidopa {...this.props}></InfoDroxidopa>} />
                    <Route path="/info_bottox" render={props => <InfoBotTox {...this.props}></InfoBotTox>} />
                    <Route path="/info_spark" render={props => <InfoSpark {...this.props}></InfoSpark>} />
                    <Route path="/info_nilo" render={props => <InfoNilo {...this.props}></InfoNilo>} />
                    <Route path="/notfound" component={NotFound} />
                    <Route exact path='/' render={props => <Homepage {...this.props}></Homepage>} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        );
    }

}
function mapStatsToProps(state) {
    console.log(state);
    return {
        currentTreatments: state.currentTreatments,
        previousTreatments: state.previousTreatments,
        user: state.user,
        userChoice: state.userChoice,
        symptom: state.symptom,
        sideEffect: state.sideEffect,
        stepper : state.stepper,
    }
}

export default connect(mapStatsToProps, {updateStepperCount})(Routes);
