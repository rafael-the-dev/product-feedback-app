import classNames from 'classnames';
import { useDisplay, useGlobalStyles, useResponsive, useTypography } from '../../styles'
import { useStyles } from './styles'
import { Avatar, Button, Grid, Hidden, MenuItem, Paper, Typography, TextField } from '@mui/material';
import { useMemo, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';

const NewFeedback = () => {
    const classes = useStyles();
    const display = useDisplay();
    const globalStyles = useGlobalStyles();
    const responsive = useResponsive();
    const text = useTypography();
    
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
    ], []);

    const [ category, setCategory ] = useState('feature');

    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    return (
        <main className={classNames(globalStyles.px, display.pt3, display.pb3)}>
            <Paper elevation={0} component="form" className={classNames(globalStyles.px, display.pt2, display.pb2,
                globalStyles.borderRadius, display.relative)}>
                    <Avatar className={classNames(display.absolute, classes.avatar)}><AddIcon /></Avatar>
                <fieldset>
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
                                display.borderBox, display.mt1, globalStyles.darkBlueColor)} 
                            id="feadback-title"
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
                            id="feadback-category"
                            select
                            fullWidth
                            value={category}
                            onChange={handleChange}
                            className={classNames(classes.input, display.mt1, classes.categories)}
                            classes={{ root: globalStyles.borderRadius }}
                            >
                            {categories.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
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
                                display.borderBox, display.mt1, globalStyles.darkBlueColor)} 
                            id="feadback-detail"
                            rows={5}
                        ></textarea>
                    </div>
                </fieldset>
            </Paper>
        </main>
    );
};

export default NewFeedback;