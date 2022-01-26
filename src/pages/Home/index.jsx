import Header from '../../components/Header'
import classNames from 'classnames';
import { useDisplay, useGlobalStyles, useResponsive, useTypography } from '../../styles'
import { useStyles } from './styles'
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const Home = () => {
    const classes = useStyles();
    const display = useDisplay();
    const globalStyles = useGlobalStyles();
    const responsive = useResponsive();
    const text = useTypography();

    return (
        <>
            <Header />
            <main>
                <div className={classNames(display.flex, display.alignCenter, display.justifyBetween,
                    globalStyles.px, classes.toolsContainer)}>
                    <Button
                        className={classNames(text.textLight, text.capitalize)}
                        endIcon={<KeyboardArrowDownIcon />}>
                        Sort by:
                        <span className={classNames(text.font7, classes.sortHighlightText)}> Most Upvotes</span>
                    </Button>
                    <Button
                        className={classNames(classes.addFeedbackButton, text.capitalize)}
                        endIcon={<AddIcon />}
                        variant="contained">
                        Add feedback
                    </Button>
                </div>
            </main>
        </>
    )
};

export default Home;