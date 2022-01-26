import { makeStyles } from '@mui/styles';
import suggestionIcon from '../../assets/images/icons/icon-suggestions.svg'

export const useStyles = makeStyles(theme => ({ 
    toolsContainer: {
        backgroundColor: '#373F68',
        paddingBottom: 10,
        paddingTop: 10,
        [theme.breakpoints.up('sm')]: {
            borderRadius: 12,
            paddingLeft: '1.5rem',
            paddingRight: '1.2rem'
        }
    },
    totalSuggestions: {
        '&::before': {
            backgroundImage: `url(${suggestionIcon})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            content: '""',
            display: 'inline-block',
            height: 22,
            marginRight: 10,
            width: 22
        }
    },
    sortHighlightText: {
        marginLeft: 5
    },
    addFeedbackButton: {
        backgroundColor: '#AD1FEA !important',
        borderRadius: '11px !important',
        padding: '9px 16px !important'
    }
}));