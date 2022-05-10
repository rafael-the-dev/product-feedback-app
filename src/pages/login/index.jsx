import { Button, FormControl, InputAdornment, InputLabel, IconButton, OutlinedInput, Paper, TextField, Typography } from '@mui/material';
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import AccountCircle from '@mui/icons-material/AccountCircle';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

import classNames from 'classnames'
import classes from "./styles.module.css"
import { useMutation } from '@apollo/client';
import { LOGIN } from 'src/graphql/mutations';
import { LoginContext } from 'src/context/LoginContext';

const Container = () => {
    const { addUser } = useContext(LoginContext)
    const [ loginMutation, loginStatus ] = useMutation(LOGIN)
    const router = useRouter()

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

    //const hasSubmitedData = useRef(false);
    const onSubmitHandler = event => {
        event.preventDefault();

        let username = userNameRef.current.value;
        let password = values.password;
        if(username.trim() !== '' && password.trim() !== '') {
            loginMutation({ 
                variables: {
                    username,
                    password
                },
                onCompleted(data) {
                    addUser(data.login);
                    router.push('/');
                },
                onError(err) {
                    console.log(err)
                }
            });
            //hasSubmitedData.current = true;
        } 
    };

    /*useEffect(() => {
        const { data } = loginStatus;
        console.log(hasSubmitedData)
        if(Boolean(data) && hasSubmitedData.current) {
            console.log(data)
            addUser(data.login);
            router.push('/');
        }
        hasSubmitedData.current = false;
    }, [ addUser, loginStatus, router ])*/

    return (
        <div className="min-h-screen flex items-center justify-center w-full px-5 md:px-0">
            <Paper 
                className={classNames(classes.loginContainer, `px-5 py-8 md:px-6`)}
                component="form"
                elavation={0}
                onSubmit={onSubmitHandler}>
                <Typography className="font-bold mb-8 text-center text-2xl uppercase">
                    Login
                </Typography>
                <fieldset>
                    <TextField
                        id="username-textfield"
                        label="Username"
                        fullWidth
                        className={classNames("mt-4")}
                        inputRef={userNameRef}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            )
                        }}
                        required
                        variant="outlined"
                    />
                    <FormControl fullWidth variant="outlined" className={classNames("mt-6")}>
                        <InputLabel htmlFor="password-textfield">Password</InputLabel>
                        <OutlinedInput
                            id="password-textfield"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            required
                            startAdornment={
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
                        className={classNames("flex flex-col sm:flex-row-reverse sm:items-center mt-4")}>
                        <Typography component="p" className="ml-4 text-sm">
                            don't you have an account? 
                            <Link href="/signup">
                                <a className={classNames(classes.signUpLink, "ml-2 underline hover:opacity-90")}>sign up.</a>
                            </Link>
                        </Typography>
                        <Button 
                            className="mt-4 py-2 sm:mt-0"
                            variant="contained"
                            type="submit"
                        >Submit
                        </Button>
                    </div>
                </fieldset>
            </Paper>
        </div>
    );
};

export default Container;