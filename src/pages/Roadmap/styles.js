import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(theme => ({ 
    toolsContainer: {
        backgroundColor: '#373F68',
        paddingBottom: 10,
        paddingTop: 10,
        [theme.breakpoints.up('sm')]: {
            paddingLeft: '1.5rem',
            paddingRight: '1.2rem'
        },
        [theme.breakpoints.up('md')]: {
            borderRadius: 12,

        }
    },
    addFeedbackButton: {
        backgroundColor: '#AD1FEA !important',
        borderRadius: '11px !important',
        padding: '7px 16px !important'
    },
    darkBlueColor: {
        color: '#3A4374 !important'
    },
    description: {
        color: '#647196'
    },
    tab: {
        borderBottom: '1px solid #8C92B3'
    },
    tabButton: {
        border: 'none',
        color: '#8C92B3',
        width: '33.33%'
    },
    inProgressStatus: {
        borderBottom: '3px solid #AD1FEA'
    },
    liveStatus: {
        borderBottom: '3px solid #62BCFA'
    },
    plannedStatus: {
        borderBottom: '3px solid #F49F85'
    },
    grid: {
        display: 'grid',
        gridGap: '0 1%',
        gridTemplateColumns: '32.33% 32.33% 32.33%',
        gridTemplateRows: 'auto',
        [theme.breakpoints.up('md')]: {
            gridGap: '0 2%',
            gridTemplateColumns: '31.33% 31.33% 31.33%',
        }
    },
    cardsGrid: {
        display: 'grid',
        gridGap: '30px 0',
        gridTemplateColumns: '100%',
        gridTemplateRows: 'auto',
        [theme.breakpoints.up('sm')]: {
            gridGap: '17px 2%',
            gridTemplateColumns: '48% 48%',
            gridTemplateRows: 'auto auto',

        },
        [theme.breakpoints.up('md')]: {
            gridGap: '8px 2%',
            gridTemplateColumns: '100%',
            //gridTemplateRows: 'auto auto',

        }
    }
}));