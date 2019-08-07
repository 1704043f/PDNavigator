import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { updateStepperCount, submitUserLife, submitReview } from '../../actions/index.js'
import BtnPlusModal from '../commons/buttonPlusModal'
import UserNavButton from '../buttons/userNavButton'
import UserSectionHead from '../texts/userSectionHead'
import UserDisplayQuestion from './userDisplayQuestion'
import { PDADLs } from '../../constants'



 class UserLife extends Component {

    componentDidMount() {
        window.scroll(0,0)
        this.props.updateStepperCount()
        const index = this.props.userADLTrack
        if (index) {this.handleAnswerSelect(index)}
    }

    state = {
        activeBtn: [],
        warningModal: false,
        redirectAddress : '/user/user_motorsy',
    }

    handleAnswerSelect = (index, key) => {
        this.setState({modalOpen: false})
        let tempArray = [0, 0, 0, 0, 0,]
        tempArray[index] = 1
        this.setState({activeBtn: tempArray})
    }

    handleNext = () => {
        const { activeBtn } = this.state
        const ADL = activeBtn.indexOf(1)
        console.log("submit - ADL:, ", ADL)
        if (ADL >= 0) {
            this.props.submitUserLife(PDADLs[ADL].key, ADL)
            if (this.props.review.redirect) {
                this.props.submitReview(false);
                this.props.history.push('/user/user_review');
            } else {
                this.props.history.push(this.state.redirectAddress)
            }
        } else {
            this.setState({warningModal: false}, () => this.setState({warningModal: true}) )
        }
    }


    render() {

        const { activeBtn, warningModal } = this.state

        return (
            <React.Fragment>

                <UserSectionHead text="Select the most accurate answer below" /><br />

                {PDADLs.map((activity, index) => {
                    return (
                        <div key={index}>
                            <UserDisplayQuestion
                                type="single"
                                title={activity.title} 
                                questionText=""
                                modalText={activity.text} 
                                modalImages=""
                                index={index}
                                active={activeBtn[index]}
                                questionKey="" 
                                handleSelect={this.handleAnswerSelect}
                            />
                        </div>
                    )
                }) }

                <br />
                <UserNavButton type="button" width="100%" text="SAVE AND CONTINUE" handleBtn={this.handleNext} />

                { warningModal && <BtnPlusModal 
                    btnType="none" 
                    modalTitle="This question is important!"
                    modalText="Many treatments and clinical trials in Parkinson disease are only appropriate for patients affected by Parkinson disease to a certain degree or in a certain way. Answering this question is importnat as it helps us further individualize the treatments and trials we suggest may be appropriate for you."
                    modalWarning={true} 
                    /> 
                }

            </React.Fragment>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ updateStepperCount, submitUserLife, submitReview }, dispatch);
}

const mapStateToProps = (state =>{
    console.log("state: ", state)
    return {
        userADL: state.adl.ADL,
        userADLTrack: state.adl.track,
        review: state.review,
    }
})

UserLife = withRouter(UserLife)
UserLife = connect(mapStateToProps, mapDispatchToProps)(UserLife)
export default UserLife
