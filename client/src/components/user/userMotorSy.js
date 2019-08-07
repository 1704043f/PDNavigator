import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {updateStepperCount, submitUserMotorSy, submitReview } from '../../actions/index.js'
import UserNavButton from '../buttons/userNavButton'
import UserSectionHead from '../texts/userSectionHead'
import UserDisplayQuestion from './userDisplayQuestion'
import Hr from '../commons/Hr'
import { motorSy, MOTOR_FLUCT_KEYS } from '../../constants'


 class UserMotorSy extends Component {

    state = {
        answerArray: [],
        answerTrack: [],
        displaySub: false,
        redirectAddress : '/user/user_nonmotorsy',
    }

    componentDidMount() {
        window.scroll(0,0)
        this.props.updateStepperCount()
        const index = this.props.userTrack
        
        if (index) { this.setState({
            answerTrack: index,
            answerArray: this.props.userMotorSy,
            displaySub: this.props.userMotorSy.find(elem => elem==="motorfluct") ? true : false
            })
        }
    }

    handleNext = () => {
        console.log("submit - meds:, ", this.state.answerArray)
        this.props.submitUserMotorSy(this.state.answerArray, this.state.answerTrack)
        if (this.props.review.redirect) {
            this.props.submitReview(false);
            this.props.history.push('/user/user_review');
        } else {
            this.props.history.push(this.state.redirectAddress)
        }
    }

    handleAnswerSelect = (index, choice, key) => {
        console.log("handleanswerselect : ", choice, " + ", index, " + ", key)
        let tempTrack = this.state.answerTrack
        let tempArray = this.state.answerArray
        let ind = tempArray.indexOf(key)
        if (choice === "ns" || choice === "no") {
            tempTrack[index] = choice  
            ind >= 0 ? tempArray.splice(ind, 1) : null
            // if 'ns', option to open help modal would go here
            if (key === "motorfluct") {
                MOTOR_FLUCT_KEYS.map(k => tempArray.indexOf(k) >= 0 ? tempArray.splice(tempArray.indexOf(k), 1) : null ) 
                tempTrack.fill(null, 5, 9)
                this.setState({displaySub: false })
            } 
        } else {
            tempTrack[index] = choice
            tempArray.indexOf(key) < 0 ? tempArray.push(key) : null
            this.setState({displaySub: key === "motorfluct" ? true : this.state.displaySub})
        }
        this.setState({
            answerTrack: tempTrack,
            answerArray: tempArray,
        })
    }

    render() {

        const { answerTrack, displaySub } = this.state

        return (
            <React.Fragment>

                <UserSectionHead text="Tick all that apply, 'no' if you don't take that medication and 'not sure' for more description. Scroll down to view all." /><br />

                {motorSy.map((sy, index) => {
                    return (
                        <React.Fragment key={index}>

                            { sy.display === "main" && 
                                <UserDisplayQuestion 
                                    type="set"
                                    title={sy.symptom} 
                                    questionText={sy.shortDescription} 
                                    modalText={sy.description} 
                                    index={index} 
                                    answer={answerTrack[index]}
                                    symptomKey={sy.key} 
                                    handleSelect={this.handleAnswerSelect}
                                /> 
                            }

                            { sy.display === "sub" && displaySub && 
                                <React.Fragment>
                                    {index === 5 && <span>
                                        <Hr full={true}/> 
                                        <UserSectionHead text="OK, tell us a bit more about your motor fluctations. Do you have any of the following problems?" />
                                    </span> }

                                    <UserDisplayQuestion 
                                        type="set"
                                        title={sy.symptom} 
                                        questionText={sy.shortDescription} 
                                        modalText={sy.description} 
                                        index={index} 
                                        answer={answerTrack[index]}
                                        symptomKey={sy.key} 
                                        handleSelect={this.handleAnswerSelect}
                                    />

                                    {index === 8 && <Hr full={true}/>}

                                </React.Fragment> 
                            }

                        </React.Fragment>
                    )
                }) }

                <br />
                <UserNavButton type="button" width="100%" text="SAVE AND CONTINUE" handleBtn={this.handleNext} />

            </React.Fragment>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ submitUserMotorSy, updateStepperCount, submitReview }, dispatch);
}

const mapStateToProps = (state) => {
    console.log("state: ", state)
    return {
        userMotorSy: state.motorSy.motorSy,
        userTrack: state.motorSy.track,
        review: state.review,
    }
}


UserMotorSy = withRouter(UserMotorSy)
UserMotorSy = connect(mapStateToProps, mapDispatchToProps)(UserMotorSy)
export default UserMotorSy
