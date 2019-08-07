import React, {Component } from 'react'
import { withRouter } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import { connect } from 'react-redux'

import Logo from '../images/PDC_logo_square.png'
import Button from '@material-ui/core/Button'
import HomeIcon from '@material-ui/icons/Home'
import AccountIcon from '@material-ui/icons/AccountCircle'
import DescriptionIcon from '@material-ui/icons/Description'
import HelpIcon from '@material-ui/icons/Help'
import DashboardIcon from '@material-ui/icons/Dashboard'

import { PRIMARY_COLOR, MAXWIDTH, MINHEIGHT } from '../themes.js'
import AccountButton from './AccountButton'

const styles = (theme) => ({  
    topNavContainer: {
        height: "100px",
        width: "100%",
        borderBottom: "1px solid rgba(47,85,121,0.2)",
        borderOpacity: 0.5,
        boxShadow: "0 1px 2px 0 rgba(47, 85, 121, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.0)",
    },
    topNavContent: {
        maxWidth: MAXWIDTH,
        minHeight: MINHEIGHT,
        padding: "0 30px 40px 40px",
        margin: '0 auto',
    },    
    topNavLogo: {
        height: '80px',
        width: '80px',
        margin: '10px 0 10px 0'
    },
    topBarBtn: {
        color: "black !important", 
        fontWeight: "bold",
        fontSize: "15px",
        backgroundColor: "white !important",
        margin: "30px 0 0 55px",
        border: "2px solid #ffffff",
        padding: 0,
        float: "right", 
        '&:focus': { outline: 'none' },
        '&:hover': { borderBottom: "2px solid #BF9000" },
        [theme.breakpoints.down('sm')]: {
            margin: "30px 0 0 10px",
        },
    },
    topBarBtnIcon: {
        fontSize: "24px", 
        color: PRIMARY_COLOR
    },
})
class AppBar extends Component {

    state = {
        screenWidth: 1600
    }

    componentDidMount() {
        window.addEventListener("resize", this.topBarResize)
        this.topBarResize()
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.topBarResize)
    }

    topBarResize = () => {
        this.setState({screenWidth: window.innerWidth})
    }

    handleNav = (redirectAddress) => {
        this.props.history.push(redirectAddress)
    }


    render () {
        const { classes, userCreds } = this.props
        const { screenWidth } = this.state

        const RenderAccountButton = props => 
             <Button type="button" className={classes.topBarBtn} onClick={() => { this.handleNav(props.redirectUrl) }} >
                <span className={classes.topBarBtnIcon}>{props.icon}</span> &nbsp;&nbsp;{props.text}
            </Button>

        return(
            <div className={classes.topNavContainer}>
                <div className={classes.topNavContent}>

                    <a href="/"><img src={Logo} className={classes.topNavLogo} alt='PD Connect' /></a>

                    { userCreds.email && userCreds.password ?

                        <span>
                            <AccountButton />
                            
                            <RenderAccountButton redirectUrl="/profile" icon={<DescriptionIcon />} text={screenWidth > 820 ? "profile" : null} />
                            <RenderAccountButton redirectUrl="/services" icon={<DashboardIcon />} text={screenWidth > 820 ? "services" : null} />
                            <RenderAccountButton redirectUrl="/services" icon={<HomeIcon />} text={screenWidth > 820 ? "home" : null} />
                        </span>

                        :

                        <span>
                            <RenderAccountButton redirectUrl="/signin" icon={<AccountIcon />} text="Sign in" />
                            <RenderAccountButton redirectUrl="/faq" icon={<HelpIcon />} text="FAQ" />
                        </span>
                    }

                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userCreds: state.creds
    }
  };

AppBar = withRouter(AppBar)
AppBar = withStyles(styles)(AppBar)
AppBar = connect(mapStateToProps)(AppBar)
export default  AppBar
