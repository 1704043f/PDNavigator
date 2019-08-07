import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import fbIcon from '../../images/socialMedia/facebook.png';
import instagramIcon from '../../images/socialMedia/instagram.png';
import twitterIcon from '../../images/socialMedia/twitter.png';
import googleIcon from '../../images/socialMedia/google+.png';
import whatsappIcon from '../../images/socialMedia/whatsapp.png';
import linkedinIcon from '../../images/socialMedia/linkedin.png';
import { PRIMARY_COLOR } from '../../themes.js'

const socIcons = [
    {icon: fbIcon, alt: "facebook icon"},
    {icon: twitterIcon, alt: "twitter icon"},
    {icon: instagramIcon, alt: "instagram icon"},
    {icon: whatsappIcon, alt: "whatsapp icon"},
    {icon: googleIcon, alt: "google icon"},
    {icon: linkedinIcon, alt: "linkedin icon"}
]

const styles = (theme) => ({

    text: {
        fontSize: "20px",
        fontWeight: "bold",
        fontFamily: 'muli',
        marginRight: "10px",
        color: PRIMARY_COLOR,
    },
    separator: {
        display: "none",
        [theme.breakpoints.down('md')]: {
            display: "block"
        },
        [theme.breakpoints.down('sm')]: {
            display: "none"
        },
    },
    icon : {
        height : '30px',
        width : '30px',
        margin : '0 5px 3px 5px',
        borderRadius : '3px',
        transition: 'all .4s ease',
        [theme.breakpoints.down('md')]: {
            margin: "0 4px 3px 4px"
        },
        '&:hover': {
            height: "36px",
            width: "36px",
            margin: "-3px 2px -3px 2px",
            cursor: "pointer"
        }
    }
})

const SocMedBox = (props) =>  {

        const { classes, title } = props

        return (
            <div className={classes.container}>
                <span className={classes.text}>&nbsp;{title}</span>
                <br className={classes.separator}/>
                {socIcons.map((icon, idx) => <img key={idx} className={classes.icon} src={icon.icon} alt={icon.alt} /> )}
            </div>
        )

}

export default withStyles( styles )(SocMedBox)