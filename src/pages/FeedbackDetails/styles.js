import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(theme => ({ 
    main: {
        [theme.breakpoints.up('md')]: {
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: '80%'
        }
    }
}));