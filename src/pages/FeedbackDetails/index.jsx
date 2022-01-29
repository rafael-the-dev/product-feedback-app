import classNames from 'classnames';
import { useDisplay, useGlobalStyles, useResponsive, useTypography } from '../../styles'
import { useStyles } from './styles'
import { Avatar, Button, Grid, Hidden, MenuItem, Paper, Typography, TextField } from '@mui/material';
import FeedbackCard from '../../components/FeedbackCard'
import CommentCard from '../../components/CommentCard'
import data from '../../data.json';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const FeedbackDetails = () => {
    const classes = useStyles();
    const display = useDisplay();
    const globalStyles = useGlobalStyles();
    const responsive = useResponsive();
    const text = useTypography();

    const [ feedback, setFeedback ] = useState({ comments: [] });

    const commentsTotal = useMemo(() => {
        let total = 0;
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
    }, [ feedback ])
    
    const [ comment, setComment ] = useState('');
    const totalCommetLenght = useRef(225);
    const changeHandler = useCallback(event => {
        const value = event.target.value; 
        if(totalCommetLenght.current + 1 > value.length) {
            setComment(value)
        }
    }, []);

    const leftLength = useMemo(() => totalCommetLenght.current - comment.length, [ comment ]);
    
    const { id } = useParams();
    useEffect(() => {
        if(id) {
            const result = data.productRequests.find(item => item.id === parseInt(id));
            if(result) {
                setFeedback(result)
            }
        }
    }, [ id ]);
    

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
                            globalStyles.button)}>
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
                            <CommentCard key={index} { ...item } />
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
                elevation={0} >
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
                            variant="contained"
                            type="submit"
                            className={classNames(globalStyles.addFeedbackButton, text.capitalize, 
                                globalStyles.button)}>
                            Post comment
                        </Button>
                    </div>
                </div>
            </Paper>
        </main>
    );
};

export default FeedbackDetails;