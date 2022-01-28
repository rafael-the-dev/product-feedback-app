import classNames from 'classnames';
import { useDisplay, useGlobalStyles, useResponsive, useTypography } from '../../styles'
import { useStyles } from './styles'
import { Avatar, Button, Grid, Hidden, MenuItem, Paper, Typography, TextField } from '@mui/material';
import data from '../../data.json';
import { useEffect, useState } from 'react';

const CommentCard = () => {
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
        <Grid item xs={12} component="article">
            <div>
                <div>
                   <div className={classNames('flex', 'justify-between', 'items-center')}>
                        <div className={classNames('flex', 'justify-between', 'items-center')}>
                            <Hidden smUp>
                                <Avatar />
                            </Hidden>
                            <div>
                                <Typography 
                                    component="h2" 
                                    className={classNames(globalStyles.darkBlueColor, text.font7)}>
                                </Typography>
                                <Typography 
                                    component="p" 
                                    className={classNames()}>
                                </Typography>
                            </div>
                        </div>
                        <Button 
                            className={classNames(text.capitalize)}>
                            Reply
                        </Button>
                   </div>
                </div>
            </div>
        </Grid>
    );
};

export default CommentCard;