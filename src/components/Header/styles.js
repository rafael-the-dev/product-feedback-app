import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(theme => ({ 
    headerHighlight: {
        backgroundImage: 'linear-gradient(205deg, #E84D70, #A337F6, #28A7ED)',
    },
    drawerRoot: {
        top: '86px !important',
        '& .MuiBackdrop-root': {
            top: '86px !important',
        }
    },
    drawerPaper: {
        top: '86px !important',
        width: '80%'
    },
    drawerContent: {
        backgroundColor: '#F2F4FF'
    },
    paper: {
        borderRadius: '16px !important'
    }
}));