import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import BtnPlusModal from '../commons/buttonPlusModal'
import UserNavButton from '../buttons/userNavButton'
import { PRIMARY_COLOR } from '../../themes';
import { updateStepperCount } from '../../actions/index.js'
import PrivacyPolicy from '../commons/privacyPolicy'

const styles =() => ({
    startTitle: {
        fontSize: "23px",
        fontWeight: "bold"
    }, 
    messageBox: {
        padding: "20px", 
        border: "2px solid", 
        borderColor: PRIMARY_COLOR, 
        borderRadius: "4px",
        backgroundColor: "#eeeeee", 
        textAlign: "justify"
    },
    messageTitle: {
        fontWeight: "bold",
        textAlign: "center"
    }
})


class UserStart extends Component {

    state = {
        redirectAddress: '/user/user_about'
    }

    componentDidMount() {
        window.scroll(0, 0)
        this.props.updateStepperCount()
    }

    handleGo = () => { this.props.history.push(this.state.redirectAddress) }

    handleBack = () => { this.props.history.push('/') }

    render() {

        const { classes } = this.props

        return (
            <React.Fragment>
                
                <span  className={classes.startTitle}>First, however, we need to know a bit about you, how Parkinson disease affects you, and about your treatment.</span>
                <br />
                <br />
                <p>This is important as it allows us so to tailor the information and services we provide specifically to you and to be of most relevance to you.</p>

                <br />

                <div className={classes.messageBox}>
                    <p className={classes.messageTitle}>Important message!</p>
                    <p>This site is intended for use by patients with Parkinson disease, their family and carers and the following pages will guide you through telling us about yourself, about how Parkinson disease affects you and about your treatment. <b>We take your privacy very seriously and will not sell or share any information about you without asking you first.</b></p>

                    Read our<BtnPlusModal btnType="terms" buttonLabel="Data Privacy Policy" modalTitle={<span>Privacy Policy</span>} modalText={<PrivacyPolicy /> } modalWarning={false}/>
                   
                </div>

                <br />
                <br />

                <div style={{textAlign: "center"}}>
                    <UserNavButton handleBtn={this.handleGo} align="center" type="button" width="50%" text="OK, LET'S GO" />
                </div>

            </React.Fragment>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ updateStepperCount }, dispatch);
}


UserStart = withRouter(UserStart)
UserStart = withStyles(styles)(UserStart)
UserStart = connect(null, mapDispatchToProps)(UserStart)
export default UserStart