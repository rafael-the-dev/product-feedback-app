import Header from 'src/components/Header'
import classNames from 'classnames';
import globalStyles from 'src/styles/global-styles.module.css'
import classes from 'src/styles/Home.module.css'
import { Button, Grid, Hidden, IconButton, List, ListItem, ListItemButton, ListItemText, ListItemIcon,
    Popover, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FeedbackCard from 'src/components/FeedbackCard';
import { useCallback, useContext, useMemo, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { selectAllProducts } from 'src/redux/selectors'

import { feedbacksComponentHelper, FeedbacksContext, FeedbacksContextProvider } from "src/context/FeedbacksContext"

const Home = () => {
    //const classes = useStyles();
    //const globalStyles = useGlobalStyles();
    const { feedbacksList } = useContext(FeedbacksContext);

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
            list = list.sort((a, b) => b.upvotes - a.upvotes);
        } else if(filter === filterOptions.leastUpvotes) {
            list = list.sort((a, b) => a.upvotes - b.upvotes);
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

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const openPopover = Boolean(anchorEl);
    const id = openPopover ? 'simple-popover' : undefined;

    const listItemClickHandler = useCallback(prop => () => {
        setFilter(prop);
        handleClose();
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
                                className={classNames("font-bold text-white", classes.totalSuggestions)}>
                                { totalSuggestions } Suggestions
                            </Typography>
                       </Hidden>
                        <Button
                            className={classNames("capitalize text-white sm:ml-8")}
                            endIcon={<KeyboardArrowDownIcon />}
                            onClick={handleClick}>
                            Sort by:
                            <span className={classNames("font-bold", classes.sortHighlightText)}> 
                                { filter.replace('-', ' ')}
                            </span>
                        </Button>
                   </div>
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
                    <Popover
                        id={id}
                        open={openPopover}
                        anchorEl={anchorEl}
                        onClose={handleClose}
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
                <Grid container className={classNames("mt-8 px-5 md:px-0")}>
                    { feedbackList }
                </Grid>
            </main>
        </>
    )
};

const Container = () => <FeedbacksContextProvider><Home /></FeedbacksContextProvider>;

export default Container;