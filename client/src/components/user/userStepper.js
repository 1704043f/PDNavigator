import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import BtnPlusModal from '../commons/buttonPlusModal'
import BottomNav from './userBottomNav'
import Terms from '../commons/terms'
import PrivacyPolicy from '../commons/privacyPolicy'
import { updateStepperCount, updateTermAgreement } from '../../actions/Stepper';
import { PRIMARY_COLOR } from '../../themes';
import Hr from "../commons/Hr"

const styles = (theme) => ({
    stepperContainer : {
        width : '100%',
        marginRight: "40px",
        marginTop: "40px",
        fontFamily : 'Muli',
    },
    stepperCounter : {
        lineHeight: 2,
    },
    stepperPageName : {
        fontWeight : 'bold',
        lineHeight: 2,
    },
    stepperSubtitle: {
        fontSize: "17px"
    },
    stepperList: {
        fontSize: "17px",
        fontWeight: "bold",
        lineHeight: 2,
        marginTop: "-38px", 
        marginBottom: "-15px",
        marginLeft: "-18px"
    },
    displayBottomNav: {
        display: "block",
        [theme.breakpoints.down('sm')]: {
            display: "none"
        }
    }

});

class UserStepper extends React.Component {
    state = {
        redirectAddress: '/user/user_account',
        checkedAgreement: false,
    };

    componentDidMount() {
        this.props.updateStepperCount();
    }

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked }, () => {
            this.props.updateTermAgreement(this.state.checkedAgreement);
        });
    };

    render() {
        const { classes, onPage, stepper } = this.props;
        const { stepperCount, pageImg, totalSteps, pageName, title, subtitle} = stepper;

        const ExtraText = () => {

            if (stepperCount === !isNaN && stepperCount < 8) {
                return null

            } else if (stepperCount === 8) {
                return (
                    <React.Fragment>
                        <br />
                        <br />
                            <form>
                                <span className={classes.stepperSubtitle}>
                                    Please read our
                                    <BtnPlusModal btnType="terms" buttonLabel="Terms & Conditions" modalTitle={<span>PDConnect Terms and Conditions</span>} modalText={< Terms />} modalwarning={false}/>
                                    and
                                    <BtnPlusModal btnType="terms" buttonLabel="Data Privacy Policy" modalTitle={<span>PD Connect Data Privacy Policy</span>} modalText={< PrivacyPolicy />} modalWarning={false}/>
                                </span>
                              
                                <br /><br /><Hr full={true} />

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={this.state.checkedAgreement}
                                            onChange={this.handleChange('checkedAgreement')}
                                            value="checkedAgreement"
                                            color="primary"
                                            style={{color: PRIMARY_COLOR}}
                                        />
                                    }
                                    label="I understand that the data I have entered will be used to provide me with individualised services and I have read this site's Terms & Conditions and Data Privacy Policy."
                                />
                            </form>
                        <Hr full={true} />
                    </React.Fragment>
                )

            } else if (stepperCount === "Finally..." || stepperCount === "Great,") {
                return (
                    <ul className={classes.stepperList} >
                        <li>Save your profile between visits</li>
                        <li>Hear first about new treatments and clinical trials matched to you</li>
                        <li>Submit your details to participate in focus groups</li>
                        <li>Earn reward points for greater involvement</li>
                        <li>Easily keep you profile up to date</li>
                    </ul>
                )

            } else if (stepperCount=== "Hello!") {
                return (
                    <React.Fragment>
                        <br />
                        <ul className={classes.stepperList}>
                            <li>Knowledge of new and established treatments that may benefit you</li>
                            <li>Clinical trials in Parkinson disease looking to recruit volunteers</li>
                            <li>Focus groups that pay you for participating</li>
                            <li>Latest Parkinson disease news and information</li>
                            <li>More</li>
                        </ul>
                    </React.Fragment>
                )
            } else return null
        }

        const StepperHead = () =>  {
            if (!isNaN(stepperCount) ) {
                return ( <h2 className={classes.stepperCounter}>Step {stepperCount} of {totalSteps}</h2> )
            } else {
                return ( <h2 className={classes.stepperCounter}>{stepperCount}</h2> )
            }
        }


        return (
            onPage !== 'Unknown step' ?
                <div className={classes.stepperContainer}>

                    <Grid container spacing={24}  >
                        <Grid item xs={12} >
                            {stepperCount && <StepperHead /> }
                            <h3 className={classes.stepperPageName}>{pageName}</h3>
                        </Grid>
                        <Grid item xs={12}>
                            <img src={pageImg} alt={pageName} />
                        </Grid>
                        <Grid item xs={12}>
                            <h2 className={classes.stepperTitle}>{title}</h2>
                        </Grid>
                        <Grid item xs={12}>
                            <span className={classes.stepperSubtitle}>{subtitle}</span>
                            <ExtraText />
                        </Grid>
                    </Grid>

                    { (stepperCount < 8 || isNaN(stepperCount) && stepperCount !== "Hello!") && 
                        <div className={classes.displayBottomNav} >
                            <BottomNav />  
                        </div>
                    }

                </div>
            :
            null
        );
    }
}

function mapStatsToProps(state) {
    return {
        stepper: state.stepper,
    }
}

UserStepper.propTypes = {
    classes: PropTypes.object,
};

const formData = {
    form: 'policyCheckbox', //unique identifier for this form
}

UserStepper = reduxForm(formData)(UserStepper)
UserStepper = withStyles(styles)(UserStepper);
UserStepper = withRouter(UserStepper)
export default connect(mapStatsToProps, { updateStepperCount, updateTermAgreement })(UserStepper);