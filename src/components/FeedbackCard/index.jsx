import { Chip, Grid, Hidden, Paper, Typography } from '@mui/material'
import classNames from 'classnames'
import { useBackground, useDisplay, useGlobalStyles, useResponsive, useTypography } from '../../styles'
import { useStyles } from './styles'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { incrementUpvotes } from '../../redux/actions';

const FeedbackCard = ({ comments, category, description, id, title, upvotes, isClickable }) => {
    const bg = useBackground();
    const classes = useStyles();
    const display = useDisplay();
    const globalStyles = useGlobalStyles();
    const responsive = useResponsive();
    const text = useTypography();

    const dispatch = useDispatch();
    
    const editClickHandler = useCallback(() => {
        dispatch(incrementUpvotes({
            id
        }));
    }, [ dispatch, id ]);

    const toggleButton = useMemo(() => (
        <button 
            className={classNames(display.borderNone, display.outlineNone, classes.button,
            display.flex, display.alignCenter, responsive.smColumn)}
            id="increase-upvotes"
            onClick={editClickHandler}>
            <KeyboardArrowDownIcon id="increase-upvotes-icon" className={classNames('rotate-180', classes.buttonArrow)} />
            <span id="increase-upvotes-text" className={classNames(classes.darkBlueColor, text.font7, classes.buttonText)}>
                { upvotes }
            </span>
        </button>
    ), [ classes, display, editClickHandler, responsive, text, upvotes ]);

    const commentButton = useMemo(() => (
        <button className={classNames(display.borderNone, display.outlineNone, classes.commentButton,
            bg.transparent, classes.darkBlueColor, text.font7, display.flex, display.alignCenter)}>
            { comments ? comments.length : 0 }
        </button>
    ), [ bg, comments, classes, display, text ]);
    
    const navigate = useNavigate();
    const clickHandler = useCallback(event => {
        if(!['increase-upvotes', 'increase-upvotes-icon', 'increase-upvotes-text'].includes(event.target.id)) {
            if(clickHandler) {
                navigate(`/feedbacks/${id}`)
            }
        }
    }, [ id, navigate ]);

    return (
        <Grid component="article" item xs={12}>
            <Paper 
                elevation={0} 
                onClick={clickHandler}
                className={classNames(classes.paper, display.mb1, display.pb1, display.pt1,
                globalStyles.px, responsive.smFlex, display.justifyBetween, display.alignStart,
                { [classes.clickablePaper]: isClickable })}>
                <Hidden smDown>
                    { toggleButton }
                </Hidden>
                <div className={classNames(display.flexGrow1, classes.content, responsive.smMl1,
                    responsive.smMr1, responsive.mdMl2)}>
                    <Typography gutterBottom component="h2" variant="h6" className={classNames(classes.darkBlueColor)}>
                        { title }
                    </Typography>
                    <Typography gutterBottom className={classNames(text.rem9, classes.description)}>
                        { description }
                    </Typography>
                    <Chip label={ category } className={classNames(classes.chip)} />
                </div>
                <Hidden smUp>
                    <div className={classNames(display.flex, display.alignCenter, display.justifyBetween,
                        display.mt1)}>
                        { toggleButton }
                        { commentButton }
                    </div>
                </Hidden>
                <Hidden smDown>
                    { commentButton }
                </Hidden>
            </Paper>
        </Grid>
    );
};

export default FeedbackCard;