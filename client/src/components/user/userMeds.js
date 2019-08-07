import React, { Component } from 'react'
import { withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { updateStepperCount, submitUserMeds, submitReview} from '../../actions/index.js'
import BtnPlusModal from '../commons/buttonPlusModal'
import UserNavButton from '../buttons/userNavButton'
import UserSectionHead from '../texts/userSectionHead'
import UserDisplayQuestion from './userDisplayQuestion'
import Hr from '../commons/Hr'
import {meds, medGroups } from '../../constants'


class UserMeds extends Component {

    state = {
        answerArray: [],
        answerTrack: [],
        answerNone: false,
        warningModal: false,
        redirectAddress : '/user/user_surgery',
    }

    componentDidMount() {
        window.scroll(0,0)
        this.props.updateStepperCount()
        const index = this.props.userTrack
        if (index && index.length > 0) {
            console.log("index: ", index)
            this.setState({
                answerTrack: index,
                answerArray: this.props.userMeds,
                answerNone: false
            })
        } else if (this.props.userAnswerNone) {
            console.log(this.props.userAnswerNone)
            this.setState({answerNone: true})
        }
    }

    handleNext = () => {
        console.log("submit - meds:, ", this.state.answerArray)
        if (this.state.answerNone || this.state.answerArray.length > 0) {
             this.props.submitUserMeds(this.state.answerArray, this.state.answerTrack, this.state.answerNone)
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

    handleAnswerSelect = (index, choice="", key) => {
        console.log("handleAnswerselect : ", key)
        let tempTrack = this.state.answerTrack
        let tempArray = this.state.answerArray
        const tempIndex = tempArray.indexOf(key)

        if (tempIndex < 0) {tempArray.push(key)}
        else if (tempTrack[index] === true && tempIndex >= 0) { tempArray.splice(tempIndex, 1) }
        tempTrack[index] = !tempTrack[index]

        this.setState({
            answerNone: false,
            answerTrack: tempTrack,
            answerArray: tempArray,
        })
    }

    handleNoneSelect = () => {
        console.log('answerNone')
        this.setState({
            modalOpen: false,
            answerNone: true,
            answerTrack: [],
            answerArray: []
        })
    }

    render() {

        const { answerTrack, answerNone, warningModal } = this.state

        return (
            <React.Fragment>

                 <UserDisplayQuestion
                    type="single"
                    title="None" 
                    questionText=""
                    modalText=""
                    modalImages=""
                    index={0}
                    active={answerNone}
                    questionKey=""
                    handleSelect={this.handleNoneSelect}
                />

                <br />
                {/* <UserSectionHead text="Or, Select all that apply from the following list (scroll down to view all)." /> */}

                {medGroups.map((group, index) => {

                    return (
                        <div key={index}>

                            <Hr full={true}/>
                            <UserSectionHead text={group.text} /><br />
                            
                            {meds.filter(med => med.class === group.class).map((med, idx) => {
                                const answerIndex = meds.findIndex(medication => medication.generic === med.generic)

                                let tradenames = ""
                                med.trade.map((name, idx) => { tradenames = tradenames.concat(`${name}`).concat(idx === med.trade.length-1 ? "" : ", ") }) 

                                return (
                                    <div key={idx}>
                                        <UserDisplayQuestion
                                            type="single"
                                            title={med.generic} 
                                            questionText={tradenames} 
                                            modalText={med.description} 
                                            modalImages={med.images}
                                            index={answerIndex}
                                            active={answerTrack[answerIndex]}
                                            questionKey={med.key} 
                                            handleSelect={this.handleAnswerSelect}
                                        />
                                        <br />
                                    </div>
                                )
                            }) }
                        </div>
                    )
                }) }

                <br />
                <UserNavButton type="button" width="100%" text="SAVE AND CONTINUE" handleBtn={this.handleNext} />

                 { warningModal && <BtnPlusModal
                    btnType="none" 
                    modalTitle="This question is important!" 
                    modalText="To suggest treatments you may benefit from we need to know what medications you currently take for Parkinson disease. Also, participation in many clinical trials and focus groups depends on how you are currently treated. Please take the time to tell us about the medications you take for Parkinson disease or select 'none' if you do not take any" 
                    modalWarning={true} 
                /> }

            </React.Fragment>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ updateStepperCount, submitUserMeds, submitReview }, dispatch);
}

const mapStateToProps = (state) => {
    console.log("state: ", state)
    return {
        userMeds: state.meds.meds,
        userTrack: state.meds.track,
        userAnswerNone: state.meds.answerNone,
        review: state.review,
    }
}

UserMeds = withRouter(UserMeds)
UserMeds = connect(mapStateToProps, mapDispatchToProps)(UserMeds)
export default UserMeds
