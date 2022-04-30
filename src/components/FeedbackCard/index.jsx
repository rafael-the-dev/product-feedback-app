import { Chip, Grid, Hidden, Paper, Typography } from '@mui/material'
import classNames from 'classnames'
import { useBackground, useDisplay, useGlobalStyles, useResponsive, useTypography } from 'src/styles'
import { useStyles } from './styles'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useCallback, useMemo } from 'react';
//import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { incrementUpvotes } from 'src/redux/actions';

import { useRouter } from 'next/router'

const FeedbackCard = ({ comments, category, description, id, title, upvotes, isClickable }) => {
    const bg = useBackground();
    const classes = useStyles();
    const display = useDisplay();
    const globalStyles = useGlobalStyles();
    const responsive = useResponsive();
    const text = useTypography();

    const router = useRouter();
    const dispatch = useDispatch();
    
    const editClickHandler = useCallback(() => {
        dispatch(incrementUpvotes({
            id
        }));
    }, [ dispatch, id ]);

    const toggleButton = useMemo(() => (
        <button 
            className={classNames("border-0 flex items-center outline-none sm:flex-col", classes.button)}
            id="increase-upvotes"
            onClick={editClickHandler}>
            <KeyboardArrowDownIcon id="increase-upvotes-icon" className={classNames('rotate-180', classes.buttonArrow)} />
            <span id="increase-upvotes-text" className={classNames("font-bold", classes.darkBlueColor, classes.buttonText)}>
                { upvotes }
            </span>
        </button>
    ), [ classes, editClickHandler, upvotes ]);

    const commentButton = useMemo(() => (
        <button className={classNames("border-0 bg-transparent flex font-bold items-center outline-none", classes.commentButton,
            classes.darkBlueColor)}>
            { comments ? comments.length : 0 }
        </button>
    ), [ comments, classes ]);
    
    //const navigate = useNavigate();
    const clickHandler = useCallback(event => {
        if(!['increase-upvotes', 'increase-upvotes-icon', 'increase-upvotes-text'].includes(event.target.id)) {
            if(clickHandler) {
                router.push(`/feedbacks/${id}`)
            }
        }
    }, [ id, router ]);

    return (
        <Grid component="article" item xs={12}>
            <Paper 
                elevation={0} 
                onClick={clickHandler}
                className={classNames("justify-between items-start mb-4 px-5 py-4 sm:flex", classes.paper,
                { [classes.clickablePaper]: isClickable })}>
                <Hidden smDown>
                    { toggleButton }
                </Hidden>
                <div className={classNames("grow sm:mx-4 md:ml-8", classes.content)}>
                    <Typography gutterBottom component="h2" variant="h6" className={classNames(classes.darkBlueColor)}>
                        { title }
                    </Typography>
                    <Typography gutterBottom className={classNames("text-sm", classes.description)}>
                        { description }
                    </Typography>
                    <Chip label={ category } className={classNames(classes.chip)} />
                </div>
                <Hidden smUp>
                    <div className={classNames("flex items-center justify-between mt-4")}>
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