import { Chip, Drawer, Hidden, IconButton, Paper, Typography } from '@mui/material';
import classNames from 'classnames'
import { useDisplay, useGlobalStyles, useResponsive, useTypography } from '../../styles'
import MenuIcon from '@mui/icons-material/Menu';
import { useStyles } from './styles'
import { useCallback, useMemo, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

const Header = () => {
    const classes = useStyles();
    const display = useDisplay();
    const globalStyles = useGlobalStyles();
    const responsive = useResponsive();
    const text = useTypography();

    const [ open, setOpen ] = useState(false);
    const closeMenu = useCallback(() => setOpen(false), []);
    const toggleMenu = useCallback(() => setOpen(o => !o), []);

    const CustomChip = useCallback(({ label }) => (
        <Chip
            label={ label }
            onClick={() => {}}
            className={classNames(display.mr1, display.mb1)} 
        />
    ), [ display ])

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
                display.wrap, classes.paper, display.pt2, responsive.smPt0, display.borderBox, 
                classes.smPx, responsive.mdMt1)}
                elevation={0}>
            </Paper>
        </>
    ), [ classes, display, globalStyles, responsive ])

    return (
        <header className={classNames(responsive.smFlex, responsive.smPt3, responsive.smPb2, classes.header,
            responsive.smJustifyBetween, responsive.mdColumn, responsive.smAlignStretch)}>
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