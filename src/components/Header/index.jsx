import { Chip, Drawer, Hidden, IconButton, Paper, Typography } from '@mui/material';
import classNames from 'classnames'
import { useDisplay, useGlobalStyles, useResponsive, useTypography } from '../../styles'
import MenuIcon from '@mui/icons-material/Menu';
import { useStyles } from './styles'
import { useCallback, useMemo, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import feedbackData from '../../data.json'

const Header = () => {
    const classes = useStyles();
    const display = useDisplay();
    const globalStyles = useGlobalStyles();
    const responsive = useResponsive();
    const text = useTypography();

    const [ open, setOpen ] = useState(false);
    const closeMenu = useCallback(() => setOpen(false), []);
    const toggleMenu = useCallback(() => setOpen(o => !o), []);

    const plansTotal = useMemo(() => {
        const total = { planned: 0, inProgress: 0, live: 0 };
        feedbackData.productRequests
            .forEach(item => {
                if(item.status === 'planned') {
                    total.planned += 1;
                } else  if(item.status === 'in-progress') {
                    total.inProgress += 1;
                } else if(item.status === 'live') {
                    total.live += 1;
                }
            });
        return total;
    }, [])

    const CustomChip = useCallback(({ label }) => (
        <Chip
            label={ label }
            onClick={() => {}}
            className={classNames(display.mr1, display.mb1, classes.chip)} 
        />
    ), [ classes, display ])

    const drawerContent = useMemo(() => (
        <>
            <Paper 
                className={classNames(display.pt1, display.pb2, globalStyles.px, display.flex, display.alignCenter,
                display.wrap, classes.paper, display.borderBox, classes.smPx, responsive.mdMt1)}
                elevation={0}>
                <CustomChip label="All" />
                <CustomChip label="UI" />
                <CustomChip label="UX" />
                <CustomChip label="Ehancement" />
                <CustomChip label="Bug" />
                <CustomChip label="Feature" />
            </Paper>
            <Paper 
                className={classNames(display.pt1, display.pb2, globalStyles.px, display.flex, display.alignCenter,
                display.wrap, classes.paper, display.borderBox, 
                classes.smPx, responsive.mdMt1)}
                elevation={0}>
                    <header className={classNames(display.flex, display.justifyBetween, display.w100, 
                        display.alignCenter)}>
                        <Typography component="h2" className={classNames(classes.roadmapTitle)}>Roadmap</Typography>
                        <Link to="/roadmap" className={classNames(text.noUnderline)}>View</Link>
                    </header>
                    <div className={classNames(display.w100, display.mt1)}>
                        <Typography 
                            className={classNames(display.flex, display.justifyBetween, display.alignCenter,
                            classes.roadmapState)}
                            gutterBottom>
                            <span className={classNames(classes.roadmapStateText, classes.roadmapStateTextPlanned)}>
                                Planned
                            </span>
                            <span className={classNames(text.font7)}>{ plansTotal.planned }</span>
                        </Typography>
                        <Typography 
                            className={classNames(display.flex, display.justifyBetween, display.alignCenter,
                            classes.roadmapState)}
                            gutterBottom>
                            <span className={classNames(classes.roadmapStateText, classes.roadmapStateTextInProgress)}>
                                In-Progress
                            </span>
                            <span className={classNames(text.font7)}>{ plansTotal.inProgress }</span>
                        </Typography>
                        <Typography className={classNames(display.flex, display.justifyBetween, display.alignCenter,
                            classes.roadmapState)}>
                            <span className={classNames(classes.roadmapStateText, classes.roadmapStateTextLive)}>
                                Live
                            </span>
                            <span className={classNames(text.font7)}>{ plansTotal.live }</span>
                        </Typography>
                    </div>
            </Paper>
        </>
    ), [ classes, display, globalStyles, plansTotal, responsive, text ])

    return (
        <header className={classNames(responsive.smFlex, responsive.smPt3, responsive.smPb2, classes.header,
            responsive.smJustifyBetween, responsive.mdColumn, responsive.smAlignStretch, responsive.mdPt0)}>
            <div
                className={classNames(text.textLight, classes.headerHighlight, display.pt1, display.pb1,
                display.flex, display.justifyBetween, display.alignCenter, globalStyles.px, classes.smPx, 
                display.borderBox, responsive.mdPt3, responsive.mdPb2)} >
                <div>
                    <Typography component="h1" variant="h6">Frontend Mentor</Typography>
                    <Typography className={classNames(text.rem9, display.opacity9)}>Feedback Board</Typography>
                </div>
                <Hidden smUp>
                    <IconButton
                        onClick={toggleMenu}>
                        { open ? <CloseIcon className={classNames(text.textLight)} /> : <MenuIcon className={classNames(text.textLight)} /> }
                    </IconButton>
                </Hidden>
            </div>
            <Hidden smDown>
                { drawerContent }
            </Hidden>
            <Hidden smUp>
                <Drawer
                    anchor="right"
                    open={open}
                    onClose={closeMenu}
                    classes={{ paper: classes.drawerPaper, root: classes.drawerRoot }}
                    >
                    <div className={classNames(globalStyles.px, classes.drawerContent, display.pt2, display.pb2)}>
                        { drawerContent }
                    </div>
                </Drawer>
            </Hidden>
        </header>
    );
};

export default Header;