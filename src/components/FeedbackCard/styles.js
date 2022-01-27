import { makeStyles } from '@mui/styles';
import commentsIcon from '../../assets/images/icons/icon-comments.svg'

export const useStyles = makeStyles(theme => ({ 
    paper: {
        borderRadius: '12px',
    },
    darkBlueColor: {
        color: '#3A4374 !important'
    },
    button: {
        backgroundColor: '#F2F4FE',
        borderRadius: 12
    },
    commentButton: {
        '&::before': {
            backgroundImage: `url(${commentsIcon})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            content: '""',
            height: 15,
            marginRight: 9,
            width: 15
        }
    }
}));