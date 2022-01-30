import classNames from 'classnames';
import { useDisplay, useGlobalStyles, useResponsive, useTypography } from '../../styles'
import { useStyles } from './styles'
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, MenuItem, Paper, Typography, TextField } from '@mui/material';
import { useMemo, useRef, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
    const navigate = useNavigate()
    const query = new URLSearchParams(search);
    const id = query.get('id');

    
    const { feedbacksList, setFeedbackList } = useContext(AppContext);
    const { register, handleSubmit, getValues , reset, setFocus, setValue, formState: { errors } } = useForm();
    const [ feedback, setFeedback ] = useState({})
    const [ openDeleteDialog, setOpenDeleteDialog ] = useState(false);
    const canIFillIn = useRef(true);
    
    const closeDeleteDialog = () => setOpenDeleteDialog(false);
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

    const deleteClickHandler = useCallback(() => {
        setFeedbackList(list => {
            const filteredList = list.filter(item => item.id !== feedback.id);
            return filteredList;
        });
        navigate('/')
    }, [ feedback, navigate, setFeedbackList ]);

    const editClickHandler = useCallback(() => {
        setFeedbackList(list => {
            const innerList = [ ...list ];
            const result = innerList.find(item => item.id === feedback.id);

            if(result) {
                result.title = getValues('feadback-title');
                result.description = getValues('feadback-detail');
                result.status = getValues('feadback-status');
                result.category = getValues('feadback-category');
                canIFillIn.current = false;
                reset();
                setCategory('feature')
                setStatus('suggestion')
            }

            return innerList;

        })
    }, [ feedback, getValues, reset, setFeedbackList ]);

    const onSubmit = data => {
        console.log(data)
        setFeedbackList(list  => {
            const newFeedback = {
                "id": list.length + 1,
                "title": data['feadback-title'],
                "category": data['feadback-category'],
                "upvotes": 0,
                "status": "suggestion",
                "description": data['feadback-detail'],
                "comments": []
            }
            return [ ...list, newFeedback ];
        });
        reset();
    }

    useEffect(() => {
        const result = feedbacksList.find(item => item.id === parseInt(id));
        if(Boolean(result) && canIFillIn.current) {
            setValue('feadback-title', result.title)
            setCategory(result.category)
            setStatus(result.status)
            setValue('feadback-detail', result.description)
            setFeedback(result);
        }
    }, [ feedbacksList, id, setValue ]);

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
                globalStyles.borderRadius, 'relative')}
                onSubmit={handleSubmit(onSubmit)} >
                    <Avatar className={classNames(display.absolute, classes.avatar, 'top-0', 'left-0')}><AddIcon /></Avatar>
                <fieldset className={classNames(display.pt1)}>
                    <Typography component="fieldset" variant="h6" className={classNames(text.font7, text.capitalize,
                        globalStyles.darkBlueColor, )}>
                        Create New Feedback
                    </Typography>
                    <div className={classNames(display.mt1)}>
                        <label 
                            htmlFor='feadback-title' className={classNames(globalStyles.darkBlueColor, classes.label,
                            text.font7)}
                            onClick={() => setFocus("feadback-title")}>
                            Feedback Title
                            <br/>
                            <span className={classNames(classes.labelDescription, globalStyles.lightBlueColor,
                                display.block)}>
                                Add a short, descriptive headline
                            </span>
                        </label>
                        <input 
                            className={classNames(display.outlineNone, classes.input, display.w100,
                            'box-border', display.mt1, globalStyles.darkBlueColor, 
                            { 'border border-red-600': Boolean(errors['feadback-title']), 'border-0':  !Boolean(errors['feadback-title'])})}
                            placeholder="enter feedback title"
                            {...register("feadback-title", { required: true })}
                        />
                        { errors['feadback-title'] && (
                            <label 
                                className={classNames('text-red-600')}
                                htmlFor='feadback-title'
                                onClick={() => setFocus("feadback-title")}>
                                This field is required
                            </label>
                        )}
                    </div>
                    <div className={classNames(display.mt2)}>
                        <label 
                            htmlFor='feadback-category' 
                            className={classNames(globalStyles.darkBlueColor, classes.label,
                            text.font7)}
                            onClick={() => setFocus("feadback-category")}>
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
                            className={classNames(classes.input, display.mt1, classes.categories)}
                            classes={{ root: globalStyles.borderRadius }}
                            {...register("feadback-category", { required: true })}
                            onChange={handleChange(setCategory)}
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
                                    htmlFor='feadback-status' 
                                    className={classNames(globalStyles.darkBlueColor, classes.label,
                                    text.font7, 'capitalize')}
                                    onClick={() => setFocus("feadback-status")}>
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
                                    className={classNames(classes.input, display.mt1, classes.categories)}
                                    classes={{ root: globalStyles.borderRadius }}
                                    {...register("feadback-status", { required: true })}
                                    onChange={handleChange(setStatus)}
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
                            text.font7)}
                            onClick={() => setFocus("feadback-detail")}>
                            Feedback Detail
                            <br/>
                            <span className={classNames(classes.labelDescription, globalStyles.lightBlueColor,
                                display.block)}>
                                Include any specific comments on what should be improved, added, etc.
                            </span>
                        </label>
                        <textarea 
                            className={classNames(display.outlineNone, classes.input, display.w100,
                            'box-border', display.mt1, globalStyles.darkBlueColor,
                            { 'border border-red-600': Boolean(errors['feadback-detail']), 'border-0':  !Boolean(errors['feadback-detail'])})} 
                            placeholder='enter feedback detail'
                            rows={5}
                            {...register("feadback-detail", { required: true })}
                        ></textarea>
                        { errors['feadback-detail'] && (
                            <label 
                                className={classNames('text-red-600')}
                                htmlFor='feadback-detail'
                                onClick={() => setFocus("feadback-detail")}>
                                This field is required
                            </label>
                        )}
                    </div>
                    { feedback.id ? (
                        <div className={classNames('flex flex-col justify-between items-stretch sm:flex-row-reverse', 
                            'sm:items-center', display.w100, display.mt2, classes.buttonsContainer,)}>
                            <div className={classNames('flex flex-col items-stretch sm:flex-row-reverse')}>
                                <Button 
                                    variant="contained"
                                    type="button"
                                    className={classNames(globalStyles.button, text.capitalize, 
                                    display.mb1, globalStyles.addFeedbackButton, responsive.smMt0, responsive.smMb0)}
                                    onClick={editClickHandler}>
                                    Save changes
                                </Button>
                                <Button 
                                    variant="contained"
                                    type="button"
                                    className={classNames(globalStyles.cancelFeedbackButton, text.capitalize, 
                                        globalStyles.button, responsive.smMr1)}>
                                    cancel
                                </Button>
                            </div>
                            {
                                feedback.id && (
                                    <Button 
                                        variant="contained"
                                        type="button"
                                        className={classNames(globalStyles.deleteFeedbackButton, text.capitalize, 
                                        globalStyles.button, display.mt1, responsive.smMt0)}
                                        onClick={() => setOpenDeleteDialog(true)}>
                                        Delete
                                    </Button>
                                )
                            }
                        </div>
                    ) : (
                        <div className={classNames('flex flex-col items-stretch sm:items-center md:flex-row-reverse', 
                            display.w100, display.mt2, classes.buttonsContainer)}>
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
            <Dialog
                    open={openDeleteDialog}
                    onClose={closeDeleteDialog}
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure that you want to delete this feedback?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            variant="contained"
                            type="button"
                            className={classNames(globalStyles.cancelFeedbackButton, text.capitalize, 
                            globalStyles.button, responsive.smMr1)}
                            onClick={closeDeleteDialog}>
                            cancel
                        </Button>
                        <Button 
                            variant="contained"
                            type="button"
                            className={classNames(globalStyles.deleteFeedbackButton, text.capitalize, 
                            globalStyles.button)}
                            onClick={deleteClickHandler}>
                            Delete
                        </Button>     
                    </DialogActions>
                </Dialog>
        </main>
    );
};

export default NewFeedback;