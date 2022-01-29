import classNames from 'classnames';
import { useDisplay, useGlobalStyles, useResponsive, useTypography } from '../../styles'
import { useStyles } from './styles'
import { Avatar, Button, Grid, Hidden, MenuItem, Paper, Typography, TextField } from '@mui/material';
import FeedbackCard from '../../components/FeedbackCard'
import CommentCard from '../../components/CommentCard'
import data from '../../data.json';
import { useEffect, useMemo, useState } from 'react';
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
        feedback.comments.forEach(item => {
            total += 1;
            if(item.replies) {
                item.replies.forEach(item => {
                    total += 1;
                })
            }
        });
        return total;
    }, [ feedback ])
    
    const { id } = useParams();
    useEffect(() => {
        if(id) {
            const result = data.productRequests.find(item => item.id === parseInt(id));
            console.log(id, result)
            if(result) {
                setFeedback(result)
            }
        }
    }, [ id ]);
    

    return (
        <main className={classNames(globalStyles.px, display.pt2, display.pb3)}>
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
            <Paper elevation={0} className={classNames(globalStyles.borderRadius, '', globalStyles.px, display.pt2)}>
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
            </Paper>
        </main>
    );
};

export default FeedbackDetails;