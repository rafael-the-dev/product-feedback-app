import Header from 'src/components/Header'
import classNames from 'classnames';
import globalStyles from 'src/styles/global-styles.module.css'
import classes from 'src/styles/Home.module.css'
import { Avatar, Button, Grid, Hidden, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemIcon,
    Paper, Popover, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FeedbackCard from 'src/components/FeedbackCard';
import { useCallback, useContext, useMemo, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link'
//import { useSelector } from 'react-redux'
//import { selectAllProducts } from 'src/redux/selectors'

import { AppContext } from "src/context/AppContext"
import { LoginContext } from 'src/context/LoginContext';
//import { feedbacksComponentHelper, FeedbacksContext, FeedbacksContextProvider } from "src/context/FeedbacksContext"

const Home = () => {
    //const classes = useStyles();
    //const globalStyles = useGlobalStyles();
    const { feedbacksList, getInitialsNameLetters } = useContext(AppContext);
    const { logout, user } = useContext(LoginContext);

    const totalSuggestions = useMemo(() => {
        let total = 0;
        feedbacksList
            .forEach(item => {
                if(item.status === 'suggestion') {
                    total += 1;
                } 
            });
        return total;
    }, [ feedbacksList ]);
    
    const filterOptions = useMemo(() => ({
        mostUpvotes: 'most-upvotes',
        leastUpvotes: 'least-upvotes',
        mostComments: 'most-comments',
        leastComments: 'least-comments'
    }), []);

    const [ filter, setFilter ] = useState(filterOptions.mostUpvotes);

    const filterList = useMemo(() => {
        let list = feedbacksList.filter(item => item.status === 'suggestion');

        if(filter === filterOptions.mostUpvotes) {
            //list = list.filter(item => item.upvotes >= 61);
            list = list.sort((a, b) => b.upVotes - a.upVotes);
        } else if(filter === filterOptions.leastUpvotes) {
            list = list.sort((a, b) => a.upVotes - b.upVotes);
        } else if(filter === filterOptions.mostComments) {
            list = list.sort((a, b) => {
                let aValue = 0
                let bValue = 0; //

                if(a.comments)
                    aValue = a.comments.length;

                if(b.comments)
                    bValue = b.comments.length;

                return bValue - aValue;
            });
        } if(filter === filterOptions.leastComments) {
            list = list.sort((a, b) => {
                let aValue = 0
                let bValue = 0; //

                if(a.comments)
                    aValue = a.comments.length;

                if(b.comments)
                    bValue = b.comments.length;

                return aValue - bValue;
            });
        }

        return list;
    }, [ feedbacksList, filter, filterOptions ])

    const feedbackList = useMemo(() => (
        filterList
            .map((item, index) => (
                <FeedbackCard key={index} isClickable={true} { ...item } />
            ))
    ), [ filterList ]);

    const [ anchorEl, setAnchorEl] = useState(null);
    const [ userAnchorEl, setUserAnchorEl] = useState(null);

    const handleClick = func => (event) => {
        func(event.currentTarget);
    };

    const handleClose = func => () => {
        func(null);
    };

    const openPopover = Boolean(anchorEl);
    const openUserPopover = Boolean(userAnchorEl);
    const id = openPopover ? 'simple-popover' : undefined;
    const userPopoverId = openUserPopover ? 'user-popover' : undefined;

    const listItemClickHandler = useCallback(prop => () => {
        setFilter(prop);
        handleClose(setAnchorEl);
    }, []);

    return (
        <>
            <Header />
            <main className={classNames("grow md:ml-8")}>
                <div className={classNames("flex items-center justify-between px-5", classes.toolsContainer)}>
                   <div className={classNames("flex items-center")}>
                       <Hidden smDown>
                            <Typography 
                                component="h2" 
                                variant="h6" 
                                className={classNames("flex font-bold items-center text-white", classes.totalSuggestions)}>
                                { totalSuggestions } Suggestions
                            </Typography>
                       </Hidden>
                        <Button
                            className={classNames("capitalize text-white sm:ml-8")}
                            endIcon={<KeyboardArrowDownIcon />}
                            onClick={handleClick(setAnchorEl)}>
                            Sort by:
                            <span className={classNames("font-bold", classes.sortHighlightText)}> 
                                { filter.replace('-', ' ')}
                            </span>
                        </Button>
                   </div>
                   <div className="flex items-center">
                    <Link href="/new-feedback">
                            <a>
                                <Hidden smDown>
                                    <Button
                                        className={classNames("capitalize", classes.addFeedbackButton, globalStyles.addFeedbackButton)}
                                        endIcon={<AddIcon />}
                                        variant="contained">
                                        Add feedback
                                    </Button>
                                </Hidden>
                                <Hidden smUp>
                                    <IconButton className={classNames("text-white", globalStyles.addFeedbackButton)}>
                                        <AddIcon />
                                    </IconButton>
                                </Hidden>
                            </a>
                    </Link>
                    <Avatar 
                        alt={user? user.name : ""}
                        className={classNames(`ml-3 uppercase user-avatar`)}
                        onClick={handleClick(setUserAnchorEl)}
                    >{ getInitialsNameLetters(user ? user.name : "") }</Avatar>
                   </div>
                   <Popover
                        id={userPopoverId}
                        open={openUserPopover}
                        anchorEl={userAnchorEl}
                        onClose={handleClose(setUserAnchorEl)}
                        classes={{ paper: classes.popoverRoot}}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        >
                        <List className={classNames(`p-0 w-[174px]`)}>
                            <ListItem 
                                disablePadding 
                                onClick={logout} 
                                className={classNames(classes.filterListItem)}>
                                <ListItemButton>
                                    <ListItemText 
                                        classes={{ root: classes.filterListItemText}} 
                                        primary="Log out" 
                                    />
                                    <ListItemIcon classes={{ root: classes.filterListIcon }}>
                                        <LogoutIcon />
                                    </ListItemIcon>
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Popover>
                    <Popover
                        id={id}
                        open={openPopover}
                        anchorEl={anchorEl}
                        onClose={handleClose(setAnchorEl)}
                        classes={{ paper: classes.popoverRoot}}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        >
                        <List className={classNames(classes.filterList)}>
                            <ListItem disablePadding onClick={listItemClickHandler(filterOptions.mostUpvotes)} className={classNames(classes.filterListItem)}>
                                <ListItemButton>
                                    <ListItemText classes={{ root: classes.filterListItemText}} primary="Most Upvotes" />
                                    { filter === filterOptions.mostUpvotes && <ListItemIcon classes={{ root: classes.filterListIcon }}>
                                        <CheckIcon />
                                    </ListItemIcon>
                                    }
                                </ListItemButton>
                            </ListItem>
                            <ListItem 
                                disablePadding 
                                onClick={listItemClickHandler(filterOptions.leastUpvotes)} 
                                className={classNames(classes.filterListItem)}>
                                <ListItemButton>
                                    <ListItemText classes={{ root: classes.filterListItemText}} primary="Least Upvotes" />
                                    { filter === filterOptions.leastUpvotes && <ListItemIcon classes={{ root: classes.filterListIcon }}>
                                        <CheckIcon />
                                    </ListItemIcon>
                                    }
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding onClick={listItemClickHandler(filterOptions.mostComments)} className={classNames(classes.filterListItem)}>
                                <ListItemButton>
                                    <ListItemText classes={{ root: classes.filterListItemText}} primary="Most Comments" />
                                    { filter === filterOptions.mostComments && <ListItemIcon classes={{ root: classes.filterListIcon }}>
                                        <CheckIcon />
                                    </ListItemIcon>
                                    }
                                </ListItemButton>
                            </ListItem>
                            <ListItem disablePadding onClick={listItemClickHandler(filterOptions.leastComments)} className={classNames(classes.filterListItem)}>
                                <ListItemButton>
                                    <ListItemText classes={{ root: classes.filterListItemText}} primary="Least Comments" />
                                    { filter === filterOptions.leastComments && <ListItemIcon classes={{ root: classes.filterListIcon }}>
                                        <CheckIcon />
                                    </ListItemIcon>
                                    }
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Popover>
                </div>
                { feedbackList.length > 0 ?
                    <Grid component="ul" container className={classNames("mt-8 pb-8 px-5 md:px-0")}>
                        { feedbackList }
                    </Grid> :
                    <Paper 
                        className={classNames(classes.noFeedbackSection, `flex flex-col grow items-center 
                        justify-center mt-6 mx-5 px-5 rounded-lg sm:px-[10%] md:mx-0`)}
                        component="section"
                        elevation={0}>
                        <Typography
                            className={classNames(globalStyles.darkBlueColor, `font-bold text-2xl before:block 
                            before:mx-auto before:bg-no-repeat empty-icon`)}
                            component="h1"
                        >
                            There is not feedback yet.
                        </Typography>
                        <Typography className={classNames(globalStyles.lightBlueColor, "mt-6 text-center")}>
                            Got a suggestion? Found a bug that needs to be squashed? We love hearing 
                            about new ideas to improve our app.
                        </Typography>
                        <Link href="/new-feedback">
                            <a className="mt-6">
                                <Button
                                    className={classNames("capitalize", classes.addFeedbackButton, globalStyles.addFeedbackButton)}
                                    endIcon={<AddIcon />}
                                    variant="contained">
                                    Add feedback
                                </Button>
                            </a>
                        </Link>
                    </Paper>
                }
            </main>
        </>
    )
};

//const Container = () => <FeedbacksContextProvider><Home /></FeedbacksContextProvider>;

export default Home;