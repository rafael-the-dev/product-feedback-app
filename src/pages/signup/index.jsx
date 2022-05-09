import { Button, Paper, TextField, Typography } from '@mui/material';
import { useCallback, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import classes from './styles.module.css'

const Container = () => {
    const [ password, setPassword ] = useState("");
    const [ comfirmPassword, setComfirmPassword ] = useState("");
    
    const userNameRef = useRef(null);
    const passwordRef = useRef(null);
    const comfirmPasswordRef = useRef(null);
    //const [ errors, setErrors ] = useState({ passwordMatch: false,  });

    const hasErrors = useCallback(({ checkWhiteSpace, checkPasswords, value, value2 }) => {
        let errors = { passwordMatch: false, whiteSpace: false };
        if(!Boolean(value)) return errors;

        if(checkPasswords) {
            if(value2 !== value) {
                errors["passwordMatch"] = true;
            }
        }

        if(checkWhiteSpace) {
            if(value.includes(" ")) {
                errors["whiteSpace"] = true;
            }
        }

        return errors;
    }, []);

    const hasError = useCallback(({ passwordMatch, whiteSpace }) => {
        return passwordMatch || whiteSpace;
    }, []);

    const inputChangeHandler = useCallback((func) => event => {
        func(event.target.value);
    }, []);

    const onSubmitHandler = useCallback(() => {}, []);

    const legendMemo = useMemo(() => (
        <Typography component="legend" className="font-bold mb-8 text-center text-2xl uppercase">
            Sign up
        </Typography>
    ), []);

    const nameMemo = useMemo(() => (
        <TextField
            id="name-textfield"
            label="Name"
            fullWidth
            className={classNames("mt-4")}
            inputRef={userNameRef}
            required
            variant="outlined"
        />
    ), []);

    const usernameMemo = useMemo(() => (
        <TextField
            id="username-textfield"
            label="Username"
            fullWidth
            className={classNames("mt-4")}
            required
            variant="outlined"
        />
    ), []);

    const passwordMemo = useMemo(() => (
        <TextField
        error={hasError(hasErrors({ checkWhiteSpace: true, value: password }))}
            id="password-textfield"
            label="Password"
            fullWidth
            className={classNames("mt-4")}
            ref={passwordRef}
            required
            type="password"
            variant="outlined"
            onChange={inputChangeHandler(setPassword)}
        />
    ), [ hasError, hasErrors, inputChangeHandler, password ]);

    const comfirmPasswordMemo = useMemo(() => (
        <TextField
            error={hasError(hasErrors({ checkWhiteSpace: true, checkPasswords: true, value: comfirmPassword, value2: password }))}
            id="confirm-password-textfield"
            label="Confirm Password"
            fullWidth
            className={classNames("mt-4")}
            ref={comfirmPasswordRef}
            required
            type="password"
            variant="outlined"
            onChange={inputChangeHandler(setComfirmPassword)}
        />
    ), [ comfirmPassword, hasError, hasErrors, inputChangeHandler, password ]);

    return (
        <div className="min-h-screen flex items-center justify-center w-full px-5 md:px-0">
            <Paper 
                className={classNames(classes.loginContainer, `px-5 py-8 md:px-6`)}
                component="form"
                elavation={0}
                onSubmit={onSubmitHandler}>
                { legendMemo }
                <fieldset>
                    { nameMemo }
                    { usernameMemo }
                    { passwordMemo }
                    { comfirmPasswordMemo }
                </fieldset>
                <div 
                    className={classNames("flex flex-col sm:flex-row-reverse sm:items-center mt-4 sm:justify-end")}>
                    <Typography component="p" className="ml-4 text-sm">
                        don't you have an account? 
                        <Link href="/login">
                            <a className={classNames(classes.signUpLink, "ml-2 underline hover:opacity-90")}>
                                sign in.
                            </a>
                        </Link>
                    </Typography>
                    <Button 
                        className="mt-4 py-2 sm:mt-0"
                        variant="contained"
                        type="submit"
                    >Submit
                    </Button>
                </div>
            </Paper>
        </div>
    );
};

export default Container;