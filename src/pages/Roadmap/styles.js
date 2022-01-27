import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(theme => ({ 
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
        gridTemplateRows: 'auto'
    }
}));