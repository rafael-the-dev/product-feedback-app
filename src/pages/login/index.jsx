import { Button, FormControl, InputAdornment, InputLabel, IconButton, OutlinedInput, Paper, TextField } from '@mui/material';
import { useCallback, useRef, useState } from 'react'
import Link from 'next/link'

import AccountCircle from '@mui/icons-material/AccountCircle';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

import classNames from 'classnames'
import classes from "./styles.module.css"

const Container = () => {
    const userNameRef = useRef(null);
    const [ values, setValues ] = useState({
        password: '',
        showPassword: false,
    });

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleClickShowPassword = useCallback(() => {
        setValues(currentValues => ({
          ...currentValues,
          showPassword: !currentValues.showPassword
        }));
    }, []);

    const handleChange = useCallback((prop) => (event) => {
        setValues(currentValues => ({ ...currentValues, [prop]: event.target.value }));
    }, []);

    return (
        <Paper 
            className={classes.loginContainer}
            component="form"
            elavation={0}>
            <fieldset>
                <TextField
                    id="username-textfield"
                    label="TextField"
                    fullWidth
                    className={classNames("mt-4")}
                    inputRef={userNameRef}
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    ),
                    }}
                    variant="outlined"
                />
                <FormControl fullWidth variant="outlined" className={classNames("mt-4")}>
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                        <InputAdornment position="start">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="start"
                            >
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                    />
                    </FormControl>
                    <div 
                        className={classNames("flex items-center mt-4")}
                        >
                        <Button 
                            variant="contained"
                            type="submit"
                        >Submit
                        </Button>
                        <p>
                            don't you have an account? 
                            <Link href="/signup" className={classNames(classes.signUpLink, "ml-4 hover:no-underline")}>
                                <a>sign up.</a>
                            </Link>
                        </p>
                    </div>
            </fieldset>
        </Paper>
    );
};

export default Container;