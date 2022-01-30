import classNames from 'classnames';
import { useCallback, useMemo, useState } from 'react';
import { useBackground, useDisplay, useGlobalStyles, useResponsive, useTypography } from '../../styles'
import { useStyles } from './styles'
//import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RoadmapFeedbackCard from '../../components/RoadmapFeedbackCard';
import data from '../../data.json'
import { Button, Hidden, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link } from 'react-router-dom'

const Roadmap = () => {
    const bg = useBackground();
    const classes = useStyles();
    const display = useDisplay();
    const globalStyles = useGlobalStyles();
    const responsive = useResponsive();
    const text = useTypography();

    const [ status, setStatus ] = useState('in-progress');

    const inProgressFeedbacks = useMemo(() => (
        data.productRequests
            .filter(item => item.status === 'in-progress')
            .map((item, index) => (
                <RoadmapFeedbackCard key={index} { ...item } />
            ))
    ), []);

    const plannedFeedbacks = useMemo(() => (
        data.productRequests
            .filter(item => item.status === 'planned')
            .map((item, index) => (
                <RoadmapFeedbackCard key={index} { ...item } />
            ))
    ), []);

    const liveFeedbacks = useMemo(() => (
        data.productRequests
            .filter(item => item.status === 'live')
            .map((item, index) => (
                <RoadmapFeedbackCard key={index} { ...item } />
            ))
    ), []);

    const plansTotal = useMemo(() => {
        const total = { planned: 0, inProgress: 0, live: 0 };
        data.productRequests
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
    }, [ ]);

    const inProgressFeedbacksSection = useMemo(() => (
        <section className={classNames(globalStyles.px, display.pb3, display.pt2, responsive.mdPt0, responsive.mdPl0,
            responsive.mdPr0)}>
            <div>
                <Typography gutterBottom component="h2" variant="h6" className={classNames(text.font7, classes.darkBlueColor)}>
                In-Progress ({ plansTotal.inProgress })
                </Typography>
                <Typography gutterBottom className={classNames(text.rem9, classes.description)}>
                    Currently being developed
                </Typography>
            </div>
            <div className={classNames(display.mt2, classes.cardsGrid)}>
                { inProgressFeedbacks }
            </div>
        </section>
    ), [ classes, display, globalStyles, inProgressFeedbacks, plansTotal, responsive, text ]);

    const liveFeedbacksSection = useMemo(() => (
        <section className={classNames(globalStyles.px, display.pb3, display.pt2, responsive.mdPt0, responsive.mdPl0,
            responsive.mdPr0)}>
            <div>
                <Typography gutterBottom component="h2" variant="h6" className={classNames(text.font7, classes.darkBlueColor)}>
                    Live ({ plansTotal.live })
                </Typography>
                <Typography gutterBottom className={classNames(text.rem9, classes.description)}>
                    Released features
                </Typography>
            </div>
            <div className={classNames(display.mt2, classes.cardsGrid)}>
                { liveFeedbacks }
            </div>
        </section>
    ), [ classes, display, globalStyles, liveFeedbacks, plansTotal, responsive, text ]);

    const plannedFeedbacksSection = useMemo(() => (
        <section className={classNames(globalStyles.px, display.pb3, display.pt2, responsive.mdPt0, responsive.mdPl0,
        responsive.mdPr0)}>
            <div>
                <Typography gutterBottom component="h2" variant="h6" className={classNames(text.font7, classes.darkBlueColor)}>
                    Planned ({ plansTotal.planned })
                </Typography>
                <Typography gutterBottom className={classNames(text.rem9, classes.description)}>
                    Ideas prioritized for research
                </Typography>
            </div>
            <div className={classNames(display.mt2, classes.cardsGrid)}>
                { plannedFeedbacks }
            </div>
        </section>
    ), [ classes, display, globalStyles, plannedFeedbacks, plansTotal, responsive, text ]);

    
    const statusClasses = useMemo(() => ({
        'in-progress': classes.inProgressStatus,
        live: classes.liveStatus,
        planned: classes.plannedStatus
    }), [ classes ]);

    const tabClickHandler = useCallback(prop => () => setStatus(prop), [])

    const TabButton = useCallback(({ label, statusType, status }) => (
        <button 
            onClick={tabClickHandler(statusType)}
            className={classNames(display.outlineNone, bg.transparent,
            classes.tabButton, text.font7, display.pt1, display.pb1, { [statusClasses[status]]: status === statusType })}>
            { label }
        </button>
    ), [ bg, classes, display, statusClasses, tabClickHandler, text ]);

    const tabs = useMemo(() => (
        <div className={classNames(classes.tab, display.flex)}>
            <TabButton status={status} statusType="planned" label={`Planned (${plansTotal.planned})`}/>
            <TabButton status={status} statusType="in-progress" label={`In-Progress (${plansTotal.inProgress})`}/>
            <TabButton status={status} statusType="live" label={`Live (${plansTotal.live})`}/>
        </div>
    ), [ classes, display, plansTotal, status ]);

    const headerBar = useMemo(() => (
        <div className={classNames(display.flex, display.alignCenter, display.justifyBetween,
            globalStyles.px, classes.toolsContainer)}>
            <div className={classNames(display.flex, display.flexColumn)}>
                <Link to="/" className={classNames('hover:underline')}>
                    <Button 
                        startIcon={<ArrowBackIosNewIcon />} 
                        className={classNames(text.textLight, text.capitalize, display.pl0, display.pr0)}>
                        Go back
                    </Button>
                </Link>
                <Typography component="h2" variant="h6" className={classNames(text.textLight, text.font7)}>
                    Roadmap
                </Typography>
            </div>
            <Button
                className={classNames(globalStyles.button, globalStyles.addFeedbackButton, text.capitalize)}
                endIcon={<AddIcon />}
                variant="contained">
                Add feedback
            </Button>
        </div>
    ), [ classes, display, globalStyles, text ]);

    const cardsGrid = useMemo(() => (
        <Hidden mdDown>
            <div className={classNames(classes.grid, display.mt3, display.justifyBetween)}>
                { plannedFeedbacksSection }
                { inProgressFeedbacksSection }
                { liveFeedbacksSection }
            </div>
        </Hidden>
    ), [ classes, display, inProgressFeedbacksSection, plannedFeedbacksSection, liveFeedbacksSection ])

    return (
        <>
            <main>
                { headerBar }
                <Hidden mdUp>
                    { tabs }
                    { status === 'in-progress' && inProgressFeedbacksSection }
                    { status === 'live' && liveFeedbacksSection }
                    { status === 'planned' && plannedFeedbacksSection }
                </Hidden>
                { cardsGrid }
            </main>
        </>
    );
};

export default Roadmap;