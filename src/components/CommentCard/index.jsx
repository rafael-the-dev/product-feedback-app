import classNames from 'classnames';
import { useDisplay, useGlobalStyles, useResponsive, useTypography } from '../../styles'
import { useStyles } from './styles'
import { Avatar, Button, Collapse, Grid, Hidden, Typography } from '@mui/material';
import { useCallback, useContext, useRef, useState } from 'react';
import { AppContext } from '../../context/AppContext';

const CommentCard = ({ commentID, content, id, isMainCommentCard, replies, replyingTo, user,  feedbackID }) => {
    const classes = useStyles();
    const display = useDisplay();
    const globalStyles = useGlobalStyles();
    const responsive = useResponsive();
    const text = useTypography(); 

    const { nextUser, generateNextUser, setFeedbackList } = useContext(AppContext)

    const [ openCollapse, setOpenCollapse ] = useState(false);
    const [ comment, setComment ] = useState('');
    const commentRef = useRef('');

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
        setFeedbackList(list => {
            const immutableList = [ ...list ];
            const result = immutableList.find(item => item.id === feedbackID);
            if(result) {
                const userComment = result.comments.find(item => item.id === commentID);

                if(userComment) {
                    const repliesList =  userComment.replies ?  userComment.replies : [];
                    userComment.replies = [ ...repliesList, 
                        {
                            "content": commentRef.current,
                            "replyingTo": user.username,
                            "user": nextUser.current
                            }
                    ];
                    setOpenCollapse(false)
                    setComment('');
                    generateNextUser();

                }
            }
            return immutableList;
        })
    }, [ commentID, feedbackID, generateNextUser, nextUser, setFeedbackList, user ]);

    return (
        <Grid item xs={12} component="article" className={classNames({ [classes.gridItem]: isMainCommentCard })}>
            <div className={classNames(display.pb1, display.mb1, classes.container, { 'grid-item-container': isMainCommentCard},
                'items-start', responsive.smFlex, responsive.smMb2)}>
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
                            <div className={classNames(display.ml1, responsive.smMl0)}>
                                <Typography 
                                    component="h3" 
                                    className={classNames(globalStyles.darkBlueColor, text.font7)}>
                                        { user.name }
                                </Typography>
                                <Typography 
                                    component="p" 
                                    className={classNames(text.rem9, globalStyles.lightBlueColor)}>
                                        @{ user.username }
                                </Typography>
                            </div>
                        </div>
                        <Button 
                            className={classNames(text.capitalize, globalStyles.blueColor, text.font7)}
                            onClick={() => setOpenCollapse(b => !b)}>
                            { openCollapse ? 'cancel' : 'Reply' }
                        </Button>
                   </div>
                   <Typography 
                        component="p" 
                        className={classNames(text.rem9, globalStyles.lightBlueColor, display.mt1)}>
                        { replyingTo ? <span className={classNames(globalStyles.purpleColor, text.font7)}>@{ replyingTo }</span> : ''} { content }
                    </Typography>
                    <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                       <form 
                            className={classNames('flex items-start', display.mt1)}
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
                                className={classNames(globalStyles.addFeedbackButton, text.capitalize, 
                                    globalStyles.button, display.ml1)}>
                                Post reply
                            </Button>
                       </form>
                    </Collapse>
                    { replies && <Grid container className={classNames(display.pl2, display.pt2)}>
                        {
                            replies.map((item, index) => (
                                <CommentCard key={index} { ...item } commentID={commentID} feedbackID={feedbackID} />
                            ))
                        }
                    </Grid>
                    }
                </div>
            </div>
        </Grid>
    );
};

export default CommentCard;