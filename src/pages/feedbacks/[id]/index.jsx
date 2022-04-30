import classNames from 'classnames';
import globalStyles from 'src/styles/global-styles.module.css'
import classes from './styles.module.css'
import { Button, Grid, IconButton, Paper, Snackbar, Typography } from '@mui/material';
import FeedbackCard from 'src/components/FeedbackCard'
import CommentCard from 'src/components/CommentCard'
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
//import { Link, useParams } from 'react-router-dom'
import { useRouter } from 'next/router';
import Link from 'next/link'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { AppContext } from 'src/context/AppContext'
import { useDispatch, useSelector } from 'react-redux'
import { addComent } from 'src/redux/actions';
import { selectAllProducts } from 'src/redux/selectors';
import CloseIcon from '@mui/icons-material/Close';

const FeedbackDetails = () => {
    const router = useRouter();
    const { id } = router.query;

    //const classes = useStyles();
    //const display = useDisplay();
    //const globalStyles = useGlobalStyles();
    //const text = useTypography();

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
    
    //const { id } = useParams();
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
        <main className={classNames("px-5 pt-8 pb-12", classes.main)}>
            <div className={classNames('flex mb-8 justify-between items-center')}>
                <Link href="/" className={classNames()}>
                    <a>
                        <Button 
                            startIcon={<ArrowBackIosNewIcon />}
                            className={classNames("font-bold capitalize", globalStyles.darkBlueColor)}>
                            Go back
                        </Button>
                    </a>
                </Link>
                <Link href={`/new-feedback?id=${id}`} className={classNames()}>
                    <a>
                        <Button 
                            variant="contained"
                            type="submit"
                            className={classNames(
                                globalStyles.button, 'capitalize hover:opacity-80')}>
                            Edit feedback
                        </Button>
                    </a>
                </Link>
            </div>
            <FeedbackCard { ...feedback } />
            { feedback.comments ? <Paper elevation={0} className={classNames(globalStyles.borderRadius, 'px-5 pt-8')}>
                <Typography 
                    component="h2" 
                    variant="h6"
                    className={classNames(globalStyles.darkBlueColor, "font-bold")}>
                        { commentsTotal } Comment{ commentsTotal > 1 ? "s" : '' }
                </Typography>
                <Grid container className={classNames("pt-8 pb-12")}>
                    { 
                        feedback.comments.map((item, index) => (
                            <CommentCard 
                                key={index} 
                                { ...item } 
                                isMainCommentCard={true} feedbackID={feedback.id} 
                                commentID={item.id}
                                setOpenOpenCommentSnackbar={setOpenOpenCommentSnackbar}
                            />
                        ))
                    }
                </Grid>
            </Paper> : (
                <></>
            ) }
            <Paper 
                className={classNames(`px-5 pt-4 pb-8 mt-8`, globalStyles.borderRadius2)}
                component="form"
                elevation={0} 
                onSubmit={submitHandler}>
                <div className={classNames("mt-4")}>
                    <label 
                        htmlFor='feedback-comment' className={classNames(globalStyles.darkBlueColor, classes.label,
                        "font-bold capitalize")}>
                        Add comment
                    </label>
                    <textarea 
                        className={classNames('border-none outline-none', globalStyles.input,
                            'box-border w-full mt-4', globalStyles.darkBlueColor)} 
                        id="feedback-comment"
                        onChange={changeHandler}
                        value={comment}
                        rows={4}
                    ></textarea>
                    <div className={classNames('flex justify-between items-center mt-4')}>
                        <label 
                            className={classNames(globalStyles.lightBlueColor)}
                            htmlFor='feedback-comment'>
                            { leftLength } characters left
                        </label>
                        <Button 
                            disabled={!Boolean(comment.trim())}
                            variant="contained"
                            type="submit"
                            className={classNames(globalStyles.addFeedbackButton, "capitalize", 
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