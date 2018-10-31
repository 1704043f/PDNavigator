import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link, Redirect} from 'react-router-dom';
import { reset, reduxForm } from 'redux-form';

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles';

import FormText from '../components/forms/FormText';
import FormTextPassword from '../components/forms/FormTextPassword';
;

const styles = theme => ({
    root: {

    },
    textBox: {
        textAlign: "center"
    },
    TextStyle: {
        marginTop: '40px',
        marginBottom: '40px'
    },
    Btn: {
        width: "150px",
        height: "30px",
        backgroundColor: "white",
        border: "2px solid grey",
        borderRadius: "10px",
        fontSize: "14px"
    },

});

class Results extends Component {



   submit(values) {
       console.log("submit: ", values)
   }



    render() {

        const { handleSubmit, classes } = this.props

        const treatmentResultList = ["duopoda", "rytary", "droxidopa"]
        const trialResultList = ["Spark", "NYLO"]
        
        return (

            <div>
                <div className={classes.textBox} style={{marginTop: "50px"}}>
                    <h1>Treatments</h1>
                </div>

                <div style={{margin: "25px"}}>
                    <h3>Based on the information you have entered you may benefit from discussing the following treatments with the doctor that looks after you for your Parkinson's disease.</h3>
                </div>

                <div style={{marginTop: "35px"}}> 
                    
                    {treatmentResultList.map((treatment, index) => {

                        return (
                            <div style={{border: "1px solid grey", borderRadius: "5px", margin: "20px"}}>
                                <div style={{margin: "20px", fontSize: "20px"}}>
                                    {index+1} {treatment}
                                </div>
                                <div style={{margin: "20px", fontSize: "20px"}}>
                                    summary
                                </div>
                                <div style={{margin: "20px", fontSize: "20px"}}>
                                    <Button type="button" className={classes.Btn} onClick={() => this.handleTreatmentInfo(index)}>Find Out More</Button>
                                </div>
                            </div>
                        ) 
                    })}
                   
                </div>
                <br />
                <br />

                <div className={classes.textBox} style={{marginTop: "50px"}}>
                    <h1>Clinical Trials</h1>
                </div>

                <div style={{margin: "25px"}}>
                    <h3>You may also be eligable to paticipate in the following Parkinson's disease clinical trials</h3>
                </div>

                <div style={{marginTop: "35px"}}> 
                    
                    {trialResultList.map((trial, index) => {

                        return (
                            <div style={{border: "1px solid grey", borderRadius: "5px", margin: "20px"}}>
                                <div style={{margin: "20px", fontSize: "20px"}}>
                                    {index+1} {trial}
                                </div>
                                <div style={{margin: "20px", fontSize: "20px"}}>
                                    summary
                                </div>
                                <div style={{margin: "20px", fontSize: "20px"}}>
                                    <Button type="button" className={classes.Btn} onClick={() => this.handleTrialInfo(index)}>Find Out More</Button>
                                </div>
                            </div>
                        ) 
                    })}
                   
                </div>
                <br />
                <br />

                <div className={classes.textBox} style={{marginTop: "50px"}}>
                    <h1>Create an account</h1>
                </div>

                <div style={{margin: "25px"}}>
                    <h3>Creating an account allows us to keep you informed of latest Parkinson's treatments and trials and also allows you to save your questionnaire responses so there is no need to re-enter your information everytime you use the application. </h3>
                </div>

                <div style={{border: "1px solid grey", borderRadius: "5px", margin: "20px", padding: "20px"}}>

                    <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>
                        <FormText
                          name="email"
                          label="Email (john.doe@you.com"
                          width="350px"
                        />
                        <br />
                        <br />
                        <FormTextPassword
                            name="password1"
                            label="Password"
                            width="350px"
                        />
                    </form>

                </div>



            </div>
        );
    }
}

const mapStateToProps = (state) => {
    //console.log("State : ", state);
    return {

    }
  };

  const formData = {
    form: 'CreateAccountForm', //unique identifier for this form 
   // validate,      
}

Results = reduxForm(formData)(Results)


Results = withRouter(Results)
Results = withStyles(styles)(Results)
Results = connect(mapStateToProps)(Results)
export default Results