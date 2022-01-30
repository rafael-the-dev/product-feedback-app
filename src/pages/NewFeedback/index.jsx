import classNames from 'classnames';
import { useDisplay, useGlobalStyles, useResponsive, useTypography } from '../../styles'
import { useStyles } from './styles'
import { Avatar, Button, MenuItem, Paper, Typography, TextField } from '@mui/material';
import { useMemo, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link, useLocation } from 'react-router-dom';
import { useCallback, useContext, useEffect } from 'react'
import { AppContext } from '../../context/AppContext';
import { useForm } from "react-hook-form";

const NewFeedback = () => {
    const classes = useStyles();
    const display = useDisplay();
    const globalStyles = useGlobalStyles();
    const responsive = useResponsive();
    const text = useTypography();
    
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const id = query.get('id');

    
    const { feedbacksList } = useContext(AppContext);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [ feedback, setFeedback ] = useState({})
    
    const categories = useMemo(() => [
      {
        value: 'feature',
        label: 'Feature',
      },
      {
        value: 'ui',
        label: 'UI',
      },
      {
        value: 'ux',
        label: 'UX',
      },
      {
        value: 'enhancement',
        label: 'Enhancement',
      },
      {
        value: 'bug',
        label: 'Bug',
      },
    ], []);

    const statusList = useMemo(() => [
        {
          value: 'suggestion',
          label: 'Suggestion',
        },
        {
          value: 'planned',
          label: 'Planned',
        },
        {
          value: 'in-progress',
          label: 'In-Progress',
        },
        {
          value: 'live',
          label: 'Live',
        }
    ], []);

    const [ category, setCategory ] = useState('feature');
    const [ status, setStatus ] = useState('suggestion');


    const handleChange = useCallback(func => (event) => {
        func(event.target.value);
    }, []);

    useEffect(() => {
        const result = feedbacksList.find(item => item.id === parseInt(id));
        if(result) {
            setValue('feadback-title', result.title)
            setCategory(result.category)
            setStatus(result.status)
            setValue('feadback-detail', result.description)
            setFeedback(result);
        }
    }, [ feedbacksList, id, setValue ])

    return (
        <main className={classNames(globalStyles.px, display.pt3, display.pb3, classes.main,
            responsive.mdPl0, responsive.mdPr0)}>
            <div className={classNames(display.mb3)}>
                <Link to={`/feedbacks/${id}`}>
                    <Button 
                        startIcon={<ArrowBackIosNewIcon />}
                        className={classNames(globalStyles.darkBlueColor, text.capitalize, text.font7)}>
                        Go back
                    </Button>
                </Link>
            </div>
            <Paper elevation={0} component="form" className={classNames(globalStyles.px, display.pb2,
                globalStyles.borderRadius, 'relative')}>
                    <Avatar className={classNames(display.absolute, classes.avatar, 'top-0', 'left-0')}><AddIcon /></Avatar>
                <fieldset className={classNames(display.pt1)}>
                    <Typography component="fieldset" variant="h6" className={classNames(text.font7, text.capitalize,
                        globalStyles.darkBlueColor, )}>
                        Create New Feedback
                    </Typography>
                    <div className={classNames(display.mt1)}>
                        <label 
                            htmlFor='feadback-title' className={classNames(globalStyles.darkBlueColor, classes.label,
                            text.font7)}>
                            Feedback Title
                            <br/>
                            <span className={classNames(classes.labelDescription, globalStyles.lightBlueColor,
                                display.block)}>
                                Add a short, descriptive headline
                            </span>
                        </label>
                        <input 
                            className={classNames(display.borderNone, display.outlineNone, classes.input, display.w100,
                                'box-border', display.mt1, globalStyles.darkBlueColor)} 
                            {...register("feadback-title", { required: true })}
                        />
                    </div>
                    <div className={classNames(display.mt2)}>
                        <label 
                            htmlFor='feadback-category' className={classNames(globalStyles.darkBlueColor, classes.label,
                            text.font7)}>
                            Category
                            <br/>
                            <span className={classNames(classes.labelDescription, globalStyles.lightBlueColor,
                                display.block)}>
                                Choose a category for your feedback
                            </span>
                        </label>
                        <TextField
                            select
                            fullWidth
                            value={category}
                            onChange={handleChange(setCategory)}
                            className={classNames(classes.input, display.mt1, classes.categories)}
                            classes={{ root: globalStyles.borderRadius }}
                            {...register("feadback-category", { required: true })}
                            >
                            {categories.map((option) => (
                                <MenuItem 
                                    key={option.value} 
                                    value={option.value} 
                                    className={classNames(globalStyles.listItem, classes.listItem, display.flex, 
                                    display.alignCenter, display.justifyBetween)}>
                                    {option.label}
                                    { category === option.value && (
                                        <CheckIcon classes={{ root: classNames(globalStyles.listIcon, 'listIcon') }} />
                                    )}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    {
                        feedback.id && (
                            <div>
                                <label 
                                    htmlFor='feadback-status' className={classNames(globalStyles.darkBlueColor, classes.label,
                                    text.font7, 'capitalize')}>
                                    Update status
                                    <br/>
                                    <span className={classNames(classes.labelDescription, globalStyles.lightBlueColor,
                                        display.block)}>
                                        Change feature state
                                    </span>
                                </label>
                                <TextField
                                    select
                                    fullWidth
                                    value={status}
                                    onChange={handleChange(setStatus)}
                                    className={classNames(classes.input, display.mt1, classes.categories)}
                                    classes={{ root: globalStyles.borderRadius }}
                                    {...register("feadback-status", { required: true })}
                                    >
                                    {statusList.map((option) => (
                                        <MenuItem 
                                            key={option.value} 
                                            value={option.value} 
                                            className={classNames(globalStyles.listItem, classes.listItem, display.flex, 
                                            display.alignCenter, display.justifyBetween, 'capitalize')}>
                                            {option.label}
                                            { status === option.value && (
                                                <CheckIcon classes={{ root: classNames(globalStyles.listIcon, 'listIcon') }} />
                                            )}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </div>
                        )
                    }
                    <div className={classNames(display.mt2)}>
                        <label 
                            htmlFor='feadback-detail' className={classNames(globalStyles.darkBlueColor, classes.label,
                            text.font7)}>
                            Feedback Detail
                            <br/>
                            <span className={classNames(classes.labelDescription, globalStyles.lightBlueColor,
                                display.block)}>
                                Include any specific comments on what should be improved, added, etc.
                            </span>
                        </label>
                        <textarea 
                            className={classNames(display.borderNone, display.outlineNone, classes.input, display.w100,
                                'box-border', display.mt1, globalStyles.darkBlueColor)} 
                            rows={5}
                            {...register("feadback-detail", { required: true })}
                        ></textarea>
                    </div>
                    { feedback.id ? (
                        <div className={classNames('flex justify-between', display.flexColumn, display.alignStretch, 
                            display.w100, display.mt2, classes.buttonsContainer, responsive.smAlignCenter,
                            responsive.mdRow)}>
                            {
                                feedback.id && (
                                    <Button 
                                        variant="contained"
                                        type="submit"
                                        className={classNames(globalStyles.deleteFeedbackButton, text.capitalize, 
                                            globalStyles.button)}>
                                        Delete
                                    </Button>
                                )
                            }
                            <div className={classNames('flex items-center')}>
                                <Button 
                                    variant="contained"
                                    type="submit"
                                    className={classNames(globalStyles.cancelFeedbackButton, text.capitalize, 
                                        globalStyles.button, responsive.smMr1)}>
                                    cancel
                                </Button>
                                <Button 
                                    variant="contained"
                                    type="button"
                                    className={classNames(globalStyles.button, text.capitalize, 
                                    display.mt1, globalStyles.addFeedbackButton, responsive.smMt0)}>
                                    Save changes
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className={classNames('flex', display.flexColumn, display.alignStretch, 
                            display.w100, display.mt2, classes.buttonsContainer, responsive.smAlignCenter,
                            responsive.mdRowReverse)}>
                            <Button 
                                variant="contained"
                                type="submit"
                                className={classNames(globalStyles.addFeedbackButton, text.capitalize, 
                                    globalStyles.button)}>
                                Add Feedback
                            </Button>
                            <Button 
                                variant="contained"
                                type="button"
                                className={classNames(globalStyles.button, text.capitalize, 
                                display.mt1, globalStyles.cancelFeedbackButton, responsive.smMt0, responsive.smMr1)}>
                                Cancel
                            </Button>
                        </div>
                    )}
                </fieldset>
            </Paper>
        </main>
    );
};

export default NewFeedback;