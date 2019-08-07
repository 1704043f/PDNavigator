import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'
import {QUESTION_BUTTON_DEFAULT_COLOR, QUESTION_BUTTON_ACTIVE_PRIMARY_COLOR } from '../../themes';
import DisplayQuestionButtonIcon from './displayQuestionButtonIcon'

const styles = () => ({
    questionButton: {
        float: "right",
        width: "50px",
        height: "60px",
        backgroundColor: "white",
        border: "4px solid",
        borderColor: QUESTION_BUTTON_DEFAULT_COLOR,
        borderRadius: "50%",
        marginLeft: "20px",
         '&:hover': {
             backgroundColor: "white",
         },
         '&:focus': {
             outline : "none !important"
         },
         '&:active': {
             outline: "none !important"
         }
    },
})

class DisplayQuestionButton extends PureComponent  {

    handleSelect = (index, choice, key) => {
        this.props.handleSelect(index, choice, key)
    }

    render() {
        const { classes, index, active, questionKey } = this.props
        return (
            <Button type="button" 
                className={classes.questionButton}  
                style={{borderColor: active ? QUESTION_BUTTON_ACTIVE_PRIMARY_COLOR : null}} 
                onClick={() => this.handleSelect(index, "", questionKey)}
            >
                <DisplayQuestionButtonIcon answerConditional={active ? true : false} />
            </Button>
        )
    }
}

DisplayQuestionButton = withStyles(styles)(DisplayQuestionButton)
export default DisplayQuestionButton