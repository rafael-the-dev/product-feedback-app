import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(theme => ({ 
    main: {
        [theme.breakpoints.up('md')]: {
            marginLeft: 'auto',
            marginRight: 'auto'
        }
    },
    avatar: {
        backgroundImage: 'linear-gradient(205deg, #E84D70, #A337F6, #28A7ED)',
        transform: 'translate(3%, -50%)',
    },
    labelDescription: {
        fontWeight: 500,
        lineHeight: '1.4rem',
        marginTop: 8
    },
    input: {
        backgroundColor: '#F7F8FD',
        borderRadius: 12,
        padding: '.8rem 1rem'
    },
    categories: {
        '& .MuiOutlinedInput-root': {
            backgroundColor: '#F7F8FD',
            borderRadius: '12px !important',
        },
        '& .MuiSelect-select': {
            color: '#647196',
            padding: '.8rem 1rem !important',
            '& .listIcon': {
                display: 'none !important'
            }
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: 'none !important',
        }
    },
    buttonsContainer: {
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row-reverse !important'
        }
    },
    listItem: {
        borderBottom: '1px solid #97979757 !important',
    }
}));