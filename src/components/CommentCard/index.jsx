import classNames from 'classnames';
import { useDisplay, useGlobalStyles, useResponsive, useTypography } from '../../styles'
import { useStyles } from './styles'
import { Avatar, Button, Grid, Hidden, MenuItem, Paper, Typography, TextField } from '@mui/material';
import { useEffect, useState, useMemo } from 'react';

const CommentCard = ({ content, id, replies, replyingTo, user,  }) => {
    const classes = useStyles();
    const display = useDisplay();
    const globalStyles = useGlobalStyles();
    const responsive = useResponsive();
    const text = useTypography();


    return (
        <Grid item xs={12} component="article" className={classNames(classes.gridItem)}>
            <div className={classNames(display.pb1, display.mb1, classes.container, 'grid-item-container',
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
                            className={classNames(text.capitalize, globalStyles.blueColor, text.font7)}>
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