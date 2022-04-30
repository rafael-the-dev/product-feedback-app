import classNames from 'classnames';
import globalStyles from 'src/styles/global-styles.module.css'
import classes from './styles.module.css'
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogContentText, IconButton, MenuItem, Paper, 
    Snackbar, Typography, TextField } from '@mui/material';
import { useMemo, useRef, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
//import { Link, useLocation, useNavigate } from 'react-router-dom';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, editFeedback, removeFeedback } from 'src/redux/actions'
import { selectAllProducts } from 'src/redux/selectors';
import CloseIcon from '@mui/icons-material/Close';

const NewFeedback = () => {
    const router = useRouter();
    const { id } = router.query;

    //const classes = useStyles();
    //const display = useDisplay();
    //const globalStyles = useGlobalStyles();
    //const responsive = useResponsive();
    //const text = useTypography();
    
    //const { search } = useLocation();
    //const navigate = useNavigate()
    //const query = new URLSearchParams(search);
    //const id = query.get('id');

    const dispatch = useDispatch();
    const feedbacksList = useSelector(selectAllProducts);
    
    const { register, handleSubmit, getValues , reset, setFocus, setValue, formState: { errors } } = useForm();
    const [ feedback, setFeedback ] = useState({})
    const [ openDeleteDialog, setOpenDeleteDialog ] = useState(false);
    const [ openSnackbar, setOpenSnackbar ] = useState(false);
    const [ snackbarMessage, setSnackbarMessage ] = useState("");
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
        dispatch(removeFeedback(feedback))
        router.push('/')
    }, [ dispatch, feedback, router, ]);

    const editClickHandler = useCallback(() => {
        dispatch(editFeedback({
            id: feedback.id,
            description: getValues('feadback-detail'),
            category: getValues('feadback-category'),
            status: getValues('feadback-status'),
            title: getValues('feadback-title')
        }));
        
        canIFillIn.current = false;
        reset();
        setCategory('feature')
        setStatus('suggestion')
        setSnackbarMessage('Changes saved.');
        setOpenSnackbar(true);
    }, [ dispatch, feedback, getValues, reset ]);

    const onSubmit = data => {
        dispatch(addProduct(data))
        setSnackbarMessage('New feedback saved.');
        setOpenSnackbar(true);
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
        <>
        <main className={classNames("px-5 py-12 md:px-0 md:mx-auto", classes.main)}>
            <div className={classNames("mb-12")}>
                <Link href={ feedback.id ? `/feedbacks/${id}` : '/' }>
                    <a>
                        <Button 
                            startIcon={<ArrowBackIosNewIcon />}
                            className={classNames("capitalize font-bold", globalStyles.darkBlueColor)}>
                            Go back
                        </Button>
                    </a>
                </Link>
            </div>
            <Paper elevation={0} component="form" className={classNames(globalStyles.borderRadius, 'px-5 pb-8 relative')}
                onSubmit={handleSubmit(onSubmit)} >
                    <Avatar className={classNames(classes.avatar, 'absolute top-0 left-0')}><AddIcon /></Avatar>
                <fieldset className={classNames("pt-4")}>
                    <Typography component="fieldset" variant="h6" className={classNames("capitalize font-bold",
                        globalStyles.darkBlueColor)}>
                        Create New Feedback
                    </Typography>
                    <div className={classNames("mt-4")}>
                        <label 
                            htmlFor='feadback-title' className={classNames("font-bold", globalStyles.darkBlueColor, classes.label)}
                            onClick={() => setFocus("feadback-title")}>
                            Feedback Title
                            <br/>
                            <span className={classNames("block", classes.labelDescription, globalStyles.lightBlueColor)}>
                                Add a short, descriptive headline
                            </span>
                        </label>
                        <input 
                            className={classNames(classes.input, 
                            'box-border mt-4 outline-none w-full text-sm', globalStyles.darkBlueColor, 
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
                    <div className={classNames("mt-8")}>
                        <label 
                            htmlFor='feadback-category' 
                            className={classNames(globalStyles.darkBlueColor, classes.label, "font-bold")}
                            onClick={() => setFocus("feadback-category")}>
                            Category
                            <br/>
                            <span className={classNames("block", classes.labelDescription, globalStyles.lightBlueColor)}>
                                Choose a category for your feedback
                            </span>
                        </label>
                        <TextField
                            select
                            fullWidth
                            value={category}
                            className={classNames("mt-4 categories", classes.input, classes.categories)}
                            classes={{ root: globalStyles.borderRadius }}
                            {...register("feadback-category", { required: true })}
                            onChange={handleChange(setCategory)}
                            >
                            {categories.map((option) => (
                                <MenuItem 
                                    key={option.value} 
                                    value={option.value} 
                                    className={classNames("flex items-center justify-between", globalStyles.listItem, classes.listItem)}>
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
                            <div className="mt-8">
                                <label 
                                    htmlFor='feadback-status' 
                                    className={classNames(globalStyles.darkBlueColor, classes.label, 'capitalize font-bold')}
                                    onClick={() => setFocus("feadback-status")}>
                                    Update status
                                    <br/>
                                    <span className={classNames("block", classes.labelDescription, globalStyles.lightBlueColor)}>
                                        Change feature state
                                    </span>
                                </label>
                                <TextField
                                    select
                                    fullWidth
                                    value={status}
                                    className={classNames("mt-4 categories", classes.input, classes.categories)}
                                    classes={{ root: globalStyles.borderRadius }}
                                    {...register("feadback-status", { required: true })}
                                    onChange={handleChange(setStatus)}
                                    >
                                    {statusList.map((option) => (
                                        <MenuItem 
                                            key={option.value} 
                                            value={option.value} 
                                            className={classNames(globalStyles.listItem, classes.listItem, 'capitalize flex items-center justify-between')}>
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
                    <div className={classNames("mt-8")}>
                        <label 
                            htmlFor='feadback-detail' className={classNames(globalStyles.darkBlueColor, classes.label,
                            "font-bold")}
                            onClick={() => setFocus("feadback-detail")}>
                            Feedback Detail
                            <br/>
                            <span className={classNames("block", classes.labelDescription, globalStyles.lightBlueColor)}>
                                Include any specific comments on what should be improved, added, etc.
                            </span>
                        </label>
                        <textarea 
                            className={classNames(classes.input,
                            'box-border mt-4 outline-none w-full text-sm', globalStyles.darkBlueColor,
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
                        <div className={classNames(`flex flex-col justify-between items-stretch sm:flex-row-reverse 
                            sm:items-center mt-8 w-full`, classes.buttonsContainer,)}>
                            <div className={classNames('flex flex-col items-stretch sm:flex-row-reverse')}>
                                <Button 
                                    variant="contained"
                                    type="button"
                                    className={classNames(`capitalize mb-4 sm:my-0`, globalStyles.button, 
                                    globalStyles.addFeedbackButton)}
                                    onClick={editClickHandler}>
                                    Save changes
                                </Button>
                                <Link href={`/`}>
                                    <a>
                                        <Button 
                                            variant="contained"
                                            type="button"
                                            className={classNames("capitalize sm:mr-4", globalStyles.cancelFeedbackButton, 
                                                globalStyles.button)}>
                                            cancel
                                        </Button>
                                    </a>
                                </Link>
                            </div>
                            <Button 
                                variant="contained"
                                type="button"
                                className={classNames(globalStyles.deleteFeedbackButton, 
                                globalStyles.button, 'capitalize mt-4 sm:mt-0 hover:opacity-80')}
                                onClick={() => setOpenDeleteDialog(true)}>
                                Delete
                            </Button>
                        </div>
                    ) : (
                        <div className={classNames('flex flex-col items-stretch sm:items-center md:flex-row-reverse', 
                            "mt-8 w-full", classes.buttonsContainer)}>
                            <Button 
                                variant="contained"
                                type="submit"
                                className={classNames("capitalize", globalStyles.addFeedbackButton, 
                                    globalStyles.button)}>
                                Add Feedback
                            </Button>
                            <Link href="/">
                                <a>
                                    <Button 
                                        variant="contained"
                                        type="button"
                                        className={classNames(`capitalize mt-4 sm:mt-0 sm:mr-4`, globalStyles.button, 
                                        globalStyles.cancelFeedbackButton)}>
                                        Cancel
                                    </Button>
                                </a>
                            </Link>
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
                            className={classNames("capitalize sm:mr-4", globalStyles.cancelFeedbackButton, 
                            globalStyles.button)}
                            onClick={closeDeleteDialog}>
                            cancel
                        </Button>
                        <Button 
                            variant="contained"
                            type="button"
                            className={classNames(globalStyles.deleteFeedbackButton, 
                            globalStyles.button, 'capitalize hover:opacity-80')}
                            onClick={deleteClickHandler}>
                            Delete
                        </Button>     
                    </DialogActions>
                </Dialog>
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={6000}
                    onClose={() => setOpenSnackbar(false)}
                    message={snackbarMessage}
                    action={
                        <IconButton
                            size="small"
                            aria-label="close"
                            color="inherit"
                            onClick={() => setOpenSnackbar(false)}
                        >
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    }
                />
        </main>
        </>
    );
};

export default NewFeedback;