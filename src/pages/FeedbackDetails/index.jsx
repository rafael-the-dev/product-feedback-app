import classNames from 'classnames';
import { useDisplay, useGlobalStyles, useTypography } from '../../styles'
import { useStyles } from './styles'
import { Button, Grid, IconButton, Paper, Snackbar, Typography } from '@mui/material';
import FeedbackCard from '../../components/FeedbackCard'
import CommentCard from '../../components/CommentCard'
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { AppContext } from '../../context/AppContext'
import { useDispatch, useSelector } from 'react-redux'
import { addComent } from '../../redux/actions';
import { selectAllProducts } from '../../redux/selectors';
import CloseIcon from '@mui/icons-material/Close';

const FeedbackDetails = () => {
    const classes = useStyles();
    const display = useDisplay();
    const globalStyles = useGlobalStyles();
    const text = useTypography();

    const dispatch = useDispatch();
    const feedbacksList = useSelector(selectAllProducts);

    const { generateNextUser, nextUser } = useContext(AppContext)
    const [ feedback, setFeedback ] = useState({ comments: [] });
    const [ openCommentSnackbar, setOpenOpenCommentSnackbar ] = useState(false);

    const commentsTotal = useMemo(() => {
        let total = 0;
        console.log(feedbacksList.length)
        if(feedback.comments) {
            feedback.comments.forEach(item => {
                total += 1;
                if(item.replies) {
                    item.replies.forEach(item => {
                        total += 1;
                    })
                }
            });
        }
        return total;
    }, [ feedback, feedbacksList ])
    
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

    const leftLength = useMemo(() => totalCommetLenght.current - comment.length, [ comment ]);
    
    const { id } = useParams();
    useEffect(() => {
        if(id) {
            const result = feedbacksList.find(item => item.id === parseInt(id));
            if(result) {
                setFeedback(result)
            }
        }
    }, [ feedbacksList, id ]);

    const submitHandler = useCallback(event => {
        event.preventDefault();
        dispatch(addComent({
            commentRef, feedback, generateNextUser, nextUser, setComment, setOpenOpenCommentSnackbar
        }));
    }, [ dispatch, feedback, generateNextUser, nextUser ]);
    

    return (
        <main className={classNames(globalStyles.px, display.pt2, display.pb3, classes.main)}>
            <div className={classNames(display.mb2, 'flex', 'justify-between items-center')}>
                <Link to="/" className={classNames()}>
                    <Button 
                        startIcon={<ArrowBackIosNewIcon />}
                        className={classNames(globalStyles.darkBlueColor, text.capitalize, text.font7)}>
                        Go back
                    </Button>
                </Link>
                <Link to={`/new-feedback?id=${id}`} className={classNames()}>
                    <Button 
                        variant="contained"
                        type="submit"
                        className={classNames(text.capitalize, 
                            globalStyles.button, 'hover:opacity-80')}>
                        Edit feedback
                    </Button>
                </Link>
            </div>
            <FeedbackCard { ...feedback } />
            { feedback.comments ? <Paper elevation={0} className={classNames(globalStyles.borderRadius, '', globalStyles.px, display.pt2)}>
                <Typography 
                    component="h2" 
                    variant="h6"
                    className={classNames(globalStyles.darkBlueColor, text.font7)}>
                        { commentsTotal } Comment{ commentsTotal > 1 ? "s" : '' }
                </Typography>
                <Grid container className={classNames(display.pt2, display.pb3)}>
                    { 
                        feedback.comments.map((item, index) => (
                            <CommentCard 
                                key={index} 
                                { ...item } 
                                isMainCommentCard={true} feedbackID={feedback.id} 
                                commentID={item.id}
                            />
                        ))
                    }
                </Grid>
            </Paper> : (
                <></>
            ) }
            <Paper 
                className={classNames(globalStyles.px, globalStyles.borderRadius, display.pt1, display.pb2, 
                    display.mt2)}
                component="form"
                elevation={0} 
                onSubmit={submitHandler}>
                <div className={classNames(display.mt1)}>
                    <label 
                        htmlFor='feedback-comment' className={classNames(globalStyles.darkBlueColor, classes.label,
                        text.font7, text.capitalize)}>
                        Add comment
                    </label>
                    <textarea 
                        className={classNames('border-none outline-none', globalStyles.input, display.w100,
                            'box-border', display.mt1, globalStyles.darkBlueColor)} 
                        id="feedback-comment"
                        onChange={changeHandler}
                        value={comment}
                        rows={4}
                    ></textarea>
                    <div className={classNames('flex justify-between items-center', display.mt1)}>
                        <label 
                            className={classNames(globalStyles.lightBlueColor)}
                            htmlFor='feedback-comment'>
                            { leftLength } characters left
                        </label>
                        <Button 
                            disabled={!Boolean(comment.trim())}
                            variant="contained"
                            type="submit"
                            className={classNames(globalStyles.addFeedbackButton, text.capitalize, 
                                globalStyles.button)}>
                            Post comment
                        </Button>
                    </div>
                </div>
                <Snackbar
                    open={openCommentSnackbar}
                    autoHideDuration={6000}
                    onClose={() => setOpenOpenCommentSnackbar(false)}
                    message="New comment added"
                    action={
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={() => setOpenOpenCommentSnackbar(false)}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                />
            </Paper>
        </main>
    );
};

export default FeedbackDetails;