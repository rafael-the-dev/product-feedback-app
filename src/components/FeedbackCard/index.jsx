import { Chip, Grid, Paper, Typography } from '@mui/material'
import classNames from 'classnames'
import { useBackground, useDisplay, useGlobalStyles, useResponsive, useTypography } from '../../styles'
import { useStyles } from './styles'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const FeedbackCard = ({ comments, category, description, title, upvotes }) => {
    const bg = useBackground();
    const classes = useStyles();
    const display = useDisplay();
    const globalStyles = useGlobalStyles();
    const responsive = useResponsive();
    const text = useTypography();

    return (
        <Grid component="article" item xs={12}>
            <Paper elevation={0} className={classNames(classes.paper, display.mb1, display.pb1, display.pt1,
                globalStyles.px)}>
                <div>
                    <Typography component="h2" variant="h6" className={classNames(classes.darkBlueColor)}>
                        { title }
                    </Typography>
                    <Typography gutterBottom className={classNames(display.mt1, text.rem9, classes.description)}>
                        { description }
                    </Typography>
                    <Chip label={ category } className={classNames(classes.chip)} />
                </div>
                <div className={classNames(display.flex, display.alignCenter, display.justifyBetween,
                    display.mt1)}>
                    <button className={classNames(display.borderNone, display.outlineNone, classes.button,
                        display.flex, display.alignCenter)}>
                        <KeyboardArrowDownIcon className={classNames(classes.buttonArrow)} />
                        <span className={classNames(classes.darkBlueColor, text.font7, classes.buttonText)}>
                            { upvotes }
                        </span>
                    </button>
                    <button className={classNames(display.borderNone, display.outlineNone, classes.commentButton,
                        bg.transparent, classes.darkBlueColor, text.font7, display.flex, display.alignCenter)}>
                        { comments ? comments.length : 0 }
                    </button>
                </div>
            </Paper>
        </Grid>
    );
};

export default FeedbackCard;