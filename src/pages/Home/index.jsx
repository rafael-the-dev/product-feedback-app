import Header from '../../components/Header'
import classNames from 'classnames';
import { useDisplay, useGlobalStyles, useResponsive, useTypography } from '../../styles'
import { useStyles } from './styles'
import { Button, Grid, Hidden, List, ListItem, ListItemButton, ListItemText, ListItemIcon,
    Popover, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FeedbackCard from '../../components/FeedbackCard';
import data from '../../data.json'
import { useCallback, useMemo, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAllProducts } from '../../redux/selectors'

const Home = () => {
    const classes = useStyles();
    const display = useDisplay();
    const globalStyles = useGlobalStyles();
    const responsive = useResponsive();
    const text = useTypography();
    const feedbacksList = useSelector(selectAllProducts);

    const totalSuggestions = useMemo(() => {
        let total = 0;
        data.productRequests
            .forEach(item => {
                if(item.status === 'suggestion') {
                    total += 1;
                } 
            });
        return total;
    }, []);
    
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
            <main className={classNames(display.flexGrow1, responsive.mdMl2)}>
                <div className={classNames(display.flex, display.alignCenter, display.justifyBetween,
                    globalStyles.px, classes.toolsContainer)}>
                   <div className={classNames(display.flex, display.alignCenter,)}>
                       <Hidden smDown>
                            <Typography component="h2" variant="h6" className={classNames(text.textLight, text.font7, classes.totalSuggestions)}>
                                { totalSuggestions } Suggestions
                            </Typography>
                       </Hidden>
                        <Button
                            className={classNames(text.textLight, text.capitalize, responsive.smMl2)}
                            endIcon={<KeyboardArrowDownIcon />}
                            onClick={handleClick}>
                            Sort by:
                            <span className={classNames(text.font7, classes.sortHighlightText)}> 
                                { filter.replace('-', ' ')}
                            </span>
                        </Button>
                   </div>
                   <Link to="/new-feedback">
                    <Button
                            className={classNames(classes.addFeedbackButton, text.capitalize)}
                            endIcon={<AddIcon />}
                            variant="contained">
                            Add feedback
                        </Button>
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
                            <ListItem disablePadding onClick={listItemClickHandler(filterOptions.leastUpvotes)} className={classNames(classes.filterListItem)}>
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
                <Grid container className={classNames(globalStyles.px, display.mt2, responsive.mdPl0, 
                    responsive.mdPr0)}>
                    { feedbackList }
                </Grid>
            </main>
        </>
    )
};

export default Home;