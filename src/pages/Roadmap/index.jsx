import classNames from 'classnames';
import { useCallback, useMemo, useState } from 'react';
import globalStyles from 'src/styles/global-styles.module.css'
import classes from './styles.module.css'
import RoadmapFeedbackCard from 'src/components/RoadmapFeedbackCard';
import { Button, Hidden, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
//import { Link } from 'react-router-dom'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { selectAllProducts} from 'src/redux/selectors'

const Roadmap = () => {
    //const classes = useStyles();

    const feedbacksList = useSelector(selectAllProducts);

    const [ status, setStatus ] = useState('in-progress');

    const inProgressFeedbacks = useMemo(() => (
        feedbacksList
            .filter(item => item.status === 'in-progress')
            .map((item, index) => (
                <RoadmapFeedbackCard key={index} { ...item } />
            ))
    ), [ feedbacksList ]);

    const plannedFeedbacks = useMemo(() => (
        feedbacksList
            .filter(item => item.status === 'planned')
            .map((item, index) => (
                <RoadmapFeedbackCard key={index} { ...item } />
            ))
    ), [ feedbacksList ]);

    const liveFeedbacks = useMemo(() => (
        feedbacksList
            .filter(item => item.status === 'live')
            .map((item, index) => (
                <RoadmapFeedbackCard key={index} { ...item } />
            ))
    ), [ feedbacksList ]);

    const plansTotal = useMemo(() => {
        const total = { planned: 0, inProgress: 0, live: 0 };
        feedbacksList
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
    }, [ feedbacksList ]);

    const inProgressFeedbacksSection = useMemo(() => (
        <section className={classNames("px-5 pb-12 pt-8 md:px-0 md:pt-0")}>
            <div>
                <Typography gutterBottom component="h2" variant="h6" className={classNames("font-bold", classes.darkBlueColor)}>
                In-Progress ({ plansTotal.inProgress })
                </Typography>
                <Typography gutterBottom className={classNames("text-sm", classes.description)}>
                    Currently being developed
                </Typography>
            </div>
            <div className={classNames("mt-8", classes.cardsGrid)}>
                { inProgressFeedbacks }
            </div>
        </section>
    ), [ inProgressFeedbacks, plansTotal ]);

    const liveFeedbacksSection = useMemo(() => (
        <section className={classNames("px-5 pb-12 pt-8 md:px-0 md:pt-0")}>
            <div>
                <Typography gutterBottom component="h2" variant="h6" className={classNames("font-bold", classes.darkBlueColor)}>
                    Live ({ plansTotal.live })
                </Typography>
                <Typography gutterBottom className={classNames("text-sm", classes.description)}>
                    Released features
                </Typography>
            </div>
            <div className={classNames("mt-8", classes.cardsGrid)}>
                { liveFeedbacks }
            </div>
        </section>
    ), [ liveFeedbacks, plansTotal ]);

    const plannedFeedbacksSection = useMemo(() => (
        <section className={classNames("px-5 pb-12 pt-8 md:px-0 md:pt-0")}>
            <div>
                <Typography gutterBottom component="h2" variant="h6" className={classNames("font-bold", classes.darkBlueColor)}>
                    Planned ({ plansTotal.planned })
                </Typography>
                <Typography gutterBottom className={classNames("text-sm", classes.description)}>
                    Ideas prioritized for research
                </Typography>
            </div>
            <div className={classNames("mt-8", classes.cardsGrid)}>
                { plannedFeedbacks }
            </div>
        </section>
    ), [ plannedFeedbacks, plansTotal ]);

    
    const statusClasses = useMemo(() => ({
        'in-progress': classes.inProgressStatus,
        live: classes.liveStatus,
        planned: classes.plannedStatus
    }), [ ]);

    const tabClickHandler = useCallback(prop => () => setStatus(prop), [])

    const TabButton = useCallback(({ label, statusType, status }) => (
        <button 
            onClick={tabClickHandler(statusType)}
            className={classNames(`bg-transparent font-bold outline-none py-4`, 
            classes.tabButton, { [statusClasses[status]]: status === statusType })}>
            { label }
        </button>
    ), [ statusClasses, tabClickHandler ]);

    const tabs = useMemo(() => (
        <div className={classNames(classes.tab, "flex")}>
            <TabButton status={status} statusType="planned" label={`Planned (${plansTotal.planned})`}/>
            <TabButton status={status} statusType="in-progress" label={`In-Progress (${plansTotal.inProgress})`}/>
            <TabButton status={status} statusType="live" label={`Live (${plansTotal.live})`}/>
        </div>
    ), [ plansTotal, status ]);

    const headerBar = useMemo(() => (
        <div className={classNames("flex items-center justify-between px-5",classes.toolsContainer)}>
            <div className={classNames("flex flex-col")}>
                <Link href="/" className={classNames('hover:underline')}>
                    <a>
                        <Button 
                            startIcon={<ArrowBackIosNewIcon />} 
                            className={classNames("capitalize px-0 text-white")}>
                            Go back
                        </Button>
                    </a>
                </Link>
                <Typography component="h2" variant="h6" className={classNames("font-bold text-white")}>
                    Roadmap
                </Typography>
            </div>
            <Button
                className={classNames("capitalize", globalStyles.button, globalStyles.addFeedbackButton)}
                endIcon={<AddIcon />}
                variant="contained">
                Add feedback
            </Button>
        </div>
    ), [ ]);

    const cardsGrid = useMemo(() => (
        <Hidden mdDown>
            <div className={classNames("mt-12 justify-between", classes.grid)}>
                { plannedFeedbacksSection }
                { inProgressFeedbacksSection }
                { liveFeedbacksSection }
            </div>
        </Hidden>
    ), [ inProgressFeedbacksSection, plannedFeedbacksSection, liveFeedbacksSection ])

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