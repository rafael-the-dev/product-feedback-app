import classNames from 'classnames';
import { useDisplay, useGlobalStyles, useResponsive, useTypography } from '../../styles'
import { useStyles } from './styles'
import { Avatar, Button, Collapse, Grid, Hidden, IconButton, Typography } from '@mui/material';
import { useCallback, useContext, useRef, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { replayComment } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const CommentCard = ({ commentID, content, id, isMainCommentCard, replies, replyingTo, user,  feedbackID, setOpenOpenCommentSnackbar }) => {
    const classes = useStyles();
    const display = useDisplay();
    const globalStyles = useGlobalStyles();
    const responsive = useResponsive();
    const text = useTypography(); 

    const dispatch = useDispatch();

    const { nextUser, generateNextUser } = useContext(AppContext)

    const [ openCommetsCollapse, setOpenCommentsCollapse ] = useState(false);
    const [ openCollapse, setOpenCollapse ] = useState(false);
    const [ comment, setComment ] = useState('');
    const commentRef = useRef('');
    const isSuccefulReply = useRef(false);

    const setIsSuccefulReply = useCallback(prop => isSuccefulReply.current = prop, []);

    const totalCommetLenght = useRef(225);
    const changeHandler = useCallback(event => {
        const value = event.target.value; 
        if(totalCommetLenght.current + 1 > value.length) {
            commentRef.current = value;
            setComment(value)
        }
    }, []);

    const submitHandler = useCallback(event => {
        event.preventDefault();

        dispatch(replayComment({
            commentID,
            content: commentRef.current,
            feedbackID,
            setIsSuccefulReply,
            nextuser: nextUser.current,
            username: user.username
        }));

        if(isSuccefulReply.current) {
            setOpenCollapse(false)
            setComment('');
            generateNextUser();
            setOpenOpenCommentSnackbar(true);
        }

        setIsSuccefulReply(false);
    }, [ commentID, dispatch, feedbackID, generateNextUser, nextUser, setIsSuccefulReply, setOpenOpenCommentSnackbar, user ]);

    return (
        <Grid item xs={12} component="article" className={classNames({ [classes.gridItem]: isMainCommentCard })}>
            <div className={classNames("pb-4 mb-4", classes.container, { 'grid-item-container': isMainCommentCard},
                'items-start sm:flex md:mb-8')}>
                <Hidden smDown>
                    <Avatar 
                        src={process.env.PUBLIC_URL + '/images/user-images/' + user.image}
                        alt={user.name}
                    />
                </Hidden>
                <div className={classNames(responsive.smMl2, 'grow')}>
                   <div className={classNames('flex', 'justify-between', 'items-center')}>
                        <div className={classNames('flex', 'justify-between', 'items-center')}>
                            <Hidden smUp>
                                <Avatar 
                                    src={process.env.PUBLIC_URL + '/images/user-images/' + user.image}
                                    alt={user.name}
                                />
                            </Hidden>
                            <div className={classNames("ml-4 sm:ml-0")}>
                                <Typography 
                                    component="h3" 
                                    className={classNames("font-bold", globalStyles.darkBlueColor)}>
                                        { user.name }
                                </Typography>
                                <Typography 
                                    component="p" 
                                    className={classNames("text-sm", globalStyles.lightBlueColor)}>
                                        @{ user.username }
                                </Typography>
                            </div>
                        </div>
                        <Button 
                            className={classNames("capitalize font-bold", globalStyles.blueColor)}
                            onClick={() => setOpenCollapse(b => !b)}>
                            { openCollapse ? 'cancel' : 'Reply' }
                        </Button>
                   </div>
                   <Typography 
                        component="p" 
                        className={classNames("mt-4 text-sm", globalStyles.lightBlueColor)}>
                        { replyingTo ? <span className={classNames("font-bold", globalStyles.purpleColor)}>@{ replyingTo }</span> : ''} { content }
                    </Typography>
                    <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                       <form 
                            className={classNames('flex items-start mt-4')}
                            onSubmit={submitHandler}>
                            <textarea 
                                className={classNames('border-none outline-none grow', globalStyles.input,
                                    'box-border', globalStyles.darkBlueColor)} 
                                id="feedback-comment"
                                onChange={changeHandler}
                                value={comment}
                                rows={2}
                            ></textarea>
                            <Button 
                                disabled={Boolean(!comment.trim())}
                                variant="contained"
                                type="submit"
                                className={classNames("capitalize ml-4", globalStyles.addFeedbackButton, 
                                    globalStyles.button)}>
                                Post reply
                            </Button>
                       </form>
                    </Collapse>
                    { replies && (
                        <>
                            <div className={classNames("flex justify-end")}>
                                <IconButton onClick={() => setOpenCommentsCollapse(o => !o)}>
                                    { openCommetsCollapse ? <KeyboardArrowDownIcon classes={{ root: classes.arrowUp}} /> : <KeyboardArrowDownIcon />}
                                </IconButton>
                            </div>
                            <Collapse  in={openCommetsCollapse} timeout="auto" unmountOnExit>
                                <Grid container className={classNames("pl-8 pt-8")}>
                                    {
                                        replies.map((item, index) => (
                                            <CommentCard key={index} { ...item } commentID={commentID} feedbackID={feedbackID} setOpenOpenCommentSnackbar={setOpenOpenCommentSnackbar} />
                                        ))
                                    }
                                </Grid>
                            </Collapse>
                        </>
                    )
                    }
                </div>
            </div>
        </Grid>
    );
};

export default CommentCard;