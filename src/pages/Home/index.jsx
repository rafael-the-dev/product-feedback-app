import Header from '../../components/Header'
import classNames from 'classnames';
import { useDisplay, useGlobalStyles, useResponsive, useTypography } from '../../styles'
import { useStyles } from './styles'
import { Button, Grid, Hidden, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FeedbackCard from '../../components/FeedbackCard';
import data from '../../data.json'
import { useMemo } from 'react';

const Home = () => {
    const classes = useStyles();
    const display = useDisplay();
    const globalStyles = useGlobalStyles();
    const responsive = useResponsive();
    const text = useTypography();

    const feedbackList = useMemo(() => (
        data.productRequests
            .map((item, index) => (
                <FeedbackCard key={index} { ...item } />
            ))
    ), [])

    return (
        <>
            <Header />
            <main className={classNames(display.flexGrow1, responsive.mdMl2)}>
                <div className={classNames(display.flex, display.alignCenter, display.justifyBetween,
                    globalStyles.px, classes.toolsContainer)}>
                   <div className={classNames(display.flex, display.alignCenter,)}>
                       <Hidden smDown>
                            <Typography component="h2" variant="h6" className={classNames(text.textLight, text.font7, classes.totalSuggestions)}>
                                { 6 } Suggestions
                            </Typography>
                       </Hidden>
                    <Button
                            className={classNames(text.textLight, text.capitalize, responsive.smMl2)}
                            endIcon={<KeyboardArrowDownIcon />}>
                            Sort by:
                            <span className={classNames(text.font7, classes.sortHighlightText)}> Most Upvotes</span>
                        </Button>
                   </div>
                    <Button
                        className={classNames(classes.addFeedbackButton, text.capitalize)}
                        endIcon={<AddIcon />}
                        variant="contained">
                        Add feedback
                    </Button>
                </div>
                <Grid container className={classNames(globalStyles.px, display.mt2, responsive.mdPl0, 
                    responsive.mdPr0)}>
                    { feedbackList }
                </Grid>
            </main>
        </>
    )
};

export default Home;