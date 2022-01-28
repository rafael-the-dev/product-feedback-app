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
    px: {
        paddingLeft: '5%',
        paddingRight: '5%',
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
    button: {
        borderRadius: '11px !important',
        padding: '7px 16px !important'
    },
    addFeedbackButton: {
        backgroundColor: '#AD1FEA !important',
    },
    cancelFeedbackButton: {
        backgroundColor: '#3A4374 !important',
    },
    borderRadius: {
        borderRadius: '12px !important'
    },
    darkBlueColor: {
        color: '#3A4374 !important'
    },
    lightBlueColor: {
        color: '#647196 !important'
    },
    listItem: {
        borderBottom: '1px solid #979797d6',
        '&:last-child': {
            borderBottom: 'none !important'
        },
        '&:hover, &:hover .MuiTypography-root': {
            color: '#AD1FEA !important',
        }
    },
    listIcon: {
        color: '#AD1FEA !important',
        minWidth: '23px !important'
    }
}));