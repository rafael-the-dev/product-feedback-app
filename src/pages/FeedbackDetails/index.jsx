import classNames from 'classnames';
import { useDisplay, useGlobalStyles, useResponsive, useTypography } from '../../styles'
import { useStyles } from './styles'
import { Avatar, Button, Grid, Hidden, MenuItem, Paper, Typography, TextField } from '@mui/material';
import FeedbackCard from '../../components/FeedbackCard'
import data from '../../data.json';
import { useEffect, useState } from 'react';

const FeedbackDetails = () => {
    const classes = useStyles();
    const display = useDisplay();
    const globalStyles = useGlobalStyles();
    const responsive = useResponsive();
    const text = useTypography();

    const [ feedback, setFeedback ] = useState({});

    useEffect(() => {
        setFeedback(data.productRequests[1])
    }, [])

    return (
        <main className={classNames(globalStyles.px, display.pt2, display.pb3)}>
            <FeedbackCard { ...feedback } />
            <Paper elevation={0} className={classNames(globalStyles.borderRadius, '')}>

            </Paper>
        </main>
    );
};

export default FeedbackDetails;