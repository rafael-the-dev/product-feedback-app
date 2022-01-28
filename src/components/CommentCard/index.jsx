import classNames from 'classnames';
import { useDisplay, useGlobalStyles, useResponsive, useTypography } from '../../styles'
import { useStyles } from './styles'
import { Avatar, Button, Grid, Hidden, MenuItem, Paper, Typography, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

const CommentCard = ({ content, id, replies, replyingTo, user,  }) => {
    const classes = useStyles();
    const display = useDisplay();
    const globalStyles = useGlobalStyles();
    const responsive = useResponsive();
    const text = useTypography();

    return (
        <Grid item xs={12} component="article">
            <div className={classNames(display.mb2)}>
                <div>
                   <div className={classNames('flex', 'justify-between', 'items-center')}>
                        <div className={classNames('flex', 'justify-between', 'items-center')}>
                            <Hidden smUp>
                                <Avatar 
                                    src={process.env.PUBLIC_URL + '/images/user-images/' + user.image}
                                    alt={user.name}
                                />
                            </Hidden>
                            <div className={classNames(display.ml1)}>
                                <Typography 
                                    component="h2" 
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
                            className={classNames(text.capitalize)}>
                            Reply
                        </Button>
                   </div>
                   <Typography 
                        component="p" 
                        className={classNames(text.rem9, globalStyles.lightBlueColor, display.mt1)}>
                        { replyingTo ? <span className={classNames(globalStyles.purpleColor, text.font7)}>@{ replyingTo }</span> : ''} { content }
                    </Typography>
                    { replies && <Grid container className={classNames(display.pl2, display.pt2)}>
                        {
                            replies.map((item, index) => (
                                <CommentCard key={index} { ...item } />
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