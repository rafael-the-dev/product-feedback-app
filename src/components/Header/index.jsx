import { IconButton, Typography } from '@mui/material';
import classNames from 'classnames'
import { useDisplay, useGlobalStyles, useTypography } from '../../styles'
import MenuIcon from '@mui/icons-material/Menu';
import { useStyles } from './styles'

const Header = () => {
    const classes = useStyles();
    const display = useDisplay();
    const globalStyles = useGlobalStyles();
    const text = useTypography();

    return (
        <header>
            <div
                className={classNames(text.textLight, classes.headerHighlight, display.pt1, display.pb1,
                display.flex, display.justifyBetween, display.alignCenter, globalStyles.px)} >
                <div>
                    <Typography component="h1" variant="h6">Frontend Mentor</Typography>
                    <Typography className={classNames(text.rem9, display.opacity9)}>Feedback Board</Typography>
                </div>
                <IconButton>
                    <MenuIcon className={classNames(text.textLight)} />
                </IconButton>
            </div>
        </header>
    );
};

export default Header;