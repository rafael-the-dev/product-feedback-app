import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(theme => ({ 
    avatar: {
        backgroundImage: 'linear-gradient(205deg, #E84D70, #A337F6, #28A7ED)',
        left: 0,
        transform: 'translate(3%, -50%)',
        top: 0
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
            padding: '.8rem 1rem !important'
        },
        '& .MuiOutlinedInput-notchedOutline': {
            border: 'none !important',
        }
    }
}));