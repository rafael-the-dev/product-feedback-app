import { Chip, Paper, Typography } from '@mui/material'
import classNames from 'classnames'
import { useBackground, useDisplay, useGlobalStyles, useTypography } from '../../styles'
import { useStyles } from './styles'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useMemo } from 'react';

const FeedbackCard = ({ comments, category, description, status, title, upvotes }) => {
    const bg = useBackground();
    const classes = useStyles();
    const display = useDisplay();
    const globalStyles = useGlobalStyles();
    //const responsive = useResponsive();
    const text = useTypography();

    const toggleButton = useMemo(() => (
        <button className={classNames(display.borderNone, display.outlineNone, classes.button,
            display.flex, display.alignCenter)}>
            <KeyboardArrowDownIcon className={classNames(classes.buttonArrow)} />
            <span className={classNames(classes.darkBlueColor, text.font7, classes.buttonText)}>
                { upvotes }
            </span>
        </button>
    ), [ classes, display, text, upvotes ]);

    const commentButton = useMemo(() => (
        <button className={classNames(display.borderNone, display.outlineNone, classes.commentButton,
            bg.transparent, classes.darkBlueColor, text.font7, display.flex, display.alignCenter)}>
            { comments ? comments.length : 0 }
        </button>
    ), [ bg, comments, classes, display, text ]);

    const feedbackStatus = useMemo(() => ({
        'in-progress': classes.inProgressStatus,
        live: classes.liveStatus,
        planned: classes.plannedStatus
    }), [ classes ]);

    const feedbackTextStatus = useMemo(() => ({
        'in-progress': classes.roadmapStateTextInProgress,
        live: classes.roadmapStateTextLive,
        planned: classes.roadmapStateTextPlanned
    }), [ classes ]);

    return (
        <article component="article" item xs={12} sm={6} md={12}>
            <Paper elevation={0} className={classNames(classes.paper, display.mb1, display.pb1, display.pt1,
                globalStyles.px, display.justifyBetween, display.alignStart, display.relative, display.borderBox)}>
                <span className={classNames(classes.roadmapStateText, feedbackTextStatus[status], display.block)}>
                    { status.replace('-', ' ') }
                </span>
                <div className={classNames(display.flexGrow1, classes.content)}>
                    <Typography gutterBottom component="h3" variant="h6" className={classNames(classes.darkBlueColor)}>
                        { title }
                    </Typography>
                    <Typography gutterBottom className={classNames(text.rem9, classes.description)}>
                        { description }
                    </Typography>
                    <Chip label={ category } className={classNames(classes.chip)} />
                </div>
                <div className={classNames(display.flex, display.alignCenter, display.justifyBetween,
                    display.mt1)}>
                    { toggleButton }
                    { commentButton }
                </div>
                <span className={classNames(display.absolute, classes.statusBar, display.w100, display.h100, 
                    display.block, feedbackStatus[status])}></span>
            </Paper>
        </article>
    );
};

export default FeedbackCard;