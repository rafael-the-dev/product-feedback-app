import { makeStyles } from "@mui/styles";

export const useGlobalStyles = makeStyles(theme => ({
    main: {
        [theme.breakpoints.up('sm')]: {
            paddingLeft: '5%',
            paddingRight: '5%',
        },
        [theme.breakpoints.up('md')]: {
            paddingLeft: '10%',
            paddingRight: '10%',
        }
    },
    hero: {
        [theme.breakpoints.up('md')]: {
            marginBottom: '3rem'
        }
    },
    heroImageContainer: {
        height: 250,
        [theme.breakpoints.up('sm')]: {
            height: 600,
        },
        [theme.breakpoints.up('md')]: {
            height: 500,
            width: 500
        },
        [theme.breakpoints.up(1100)]: {
            width: 600
        }
    },
    px: {
        paddingLeft: '5%',
        paddingRight: '5%',
    },
    heroContent: {
        background: '#FFF',//'#F2F2F2',
        boxSizing: 'border-box',
        position: 'relative',
        transform: 'translate(0, -29%)',
        width: '90%',
        [theme.breakpoints.up('sm')]: {
            alignSelf: 'flex-end',
            paddingTop: '8rem !important',
            transform: 'translate(0, -100%)',
            '&::before': {
                color: '#EEEFF4',
                display: 'block',
                fontSize: '8rem',
                fontWeight: 900,
                position: 'absolute',
                right: 0,
                transform: 'translateY(-50%)',
                top: 0
            }
        },
        [theme.breakpoints.up('md')]: {
            bottom: 0,
            maxWidth: '70%',
            position: 'absolute',
            right: 0, 
            transform: 'translate(0, 0)',
        },
        [theme.breakpoints.up(1100)]: {
            maxWidth: '60%',
        }
    },
    heroContentTitle: {
        [theme.breakpoints.up('sm')]: {
            fontSize: '2.8rem !important',
            '&::before': {
                backgroundColor: '#C8CCD8',
                content: '""',
                display: 'block',
                height: 1,
                marginBottom: '2rem',
                width: 63
            }
        },
    },
    heroContentDescription: {
        color: '#60636D'
    },
    welcomeSection: {
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            paddingRight: 0
        }
    },
    welcomeContent: {
        [theme.breakpoints.up('md')]: {
            maxWidth: '50%',
        }
    },
    introTitleBar: {
        '&::before': {
            backgroundColor: '#C8CCD8',
            content: '""',
            display: 'block',
            height: 1,
            marginBottom: '2.4rem',
            width: 90
        },
    },
    introDescription: {
        color: '#60636D'
    },
    introIllustration: {
        height: 500,
        width: 400
    },
}));