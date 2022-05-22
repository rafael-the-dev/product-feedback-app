import { Alert, AlertTitle, Button, Paper, TextField, Typography } from '@mui/material';
import { useCallback, useContext, useMemo, useRef, useState } from 'react'
import { useMutation } from "@apollo/client";
import Link from 'next/link'
import classNames from 'classnames'
import classes from './styles.module.css'
import { useRouter } from 'next/router'

import { CREATE_NEW_USER } from 'src/graphql/mutations'
import { AppContext } from 'src/context/AppContext';

const Container = () => {
    const { errorHandler, startLoading, stopLoading } = useContext(AppContext)
    const [ password, setPassword ] = useState("");
    const [ comfirmPassword, setComfirmPassword ] = useState("");
    const [ username, setUsername ] = useState("");

    const alertRef = useRef(null);
    const nameRef = useRef(null);
    const userNameRef = useRef(null);
    const passwordRef = useRef(null);
    const comfirmPasswordRef = useRef(null);

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

    const usernameErrors = useMemo(() => hasErrors({ checkWhiteSpace: true, value: username }), [  hasErrors, username ])
    const passwordErrors = useMemo(() => hasErrors({ checkWhiteSpace: true, value: password }), [ hasErrors, password ])
    const comfirmPasswordErrors = useMemo(() => hasErrors({ checkWhiteSpace: true, checkPasswords: true, value: comfirmPassword, value2: password }), [ comfirmPassword, hasErrors, password ])
    
    const hasUsernameError = useMemo(() => hasError(usernameErrors), [ hasError, usernameErrors ]);
    const hasPasswordError = useMemo(() => hasError(passwordErrors), [ hasError, passwordErrors ]);
    const hasComfirmPasswordError = useMemo(() => hasError(comfirmPasswordErrors), [ comfirmPasswordErrors, hasError ]);

    const hasFormError = useMemo(() => hasUsernameError || hasPasswordError || hasComfirmPasswordError, [ hasUsernameError, hasPasswordError, hasComfirmPasswordError ])
    
    const inputChangeHandler = useCallback((func) => event => {
        func(event.target.value);
    }, []);

    const errorsPanel = useCallback(({ htmlFor, passwordMatch, whiteSpace }) => {
        let text = "";
        if(passwordMatch) {
            text += "* Passwords don't match<br/>"
        }

        if(whiteSpace) {
            text += "* Value must not contain whitespace"
        }
        return (
            <Typography 
                className="pl-4 pt-3 block text-red-600"
                component="label"
                dangerouslySetInnerHTML={{ __html: text }} 
                htmlFor={htmlFor}>
            </Typography>
        )
    }, []);

    const usernameErrorsPanel = useMemo(() => {
        return errorsPanel({ ...usernameErrors, htmlFor: "username-textfield" })
    }, [ usernameErrors, errorsPanel ])

    const passwordErrorsPanel = useMemo(() => {
        return errorsPanel({ ...passwordErrors, htmlFor: "password-textfield" })
    }, [ passwordErrors, errorsPanel ])

    const comfirmPasswordErrorsPanel = useMemo(() => {
        return errorsPanel({ ...comfirmPasswordErrors, htmlFor: "confirm-password-textfield" })
    }, [ comfirmPasswordErrors, errorsPanel ])

    const router = useRouter();
    const mutation = useMutation(CREATE_NEW_USER);
    const onSubmitHandler = useCallback((event) => {
        event.preventDefault();
        alertRef.current.classList.add("hidden");
        const registerUser = mutation[0];

        if(!hasFormError) {
            startLoading();
            registerUser({
                variables: {
                    user: {
                        name: nameRef.current.value,
                        password: passwordRef.current.value,
                        username: userNameRef.current.value,
                    }
                },
                onCompleted() {
                    stopLoading();
                    router.push('/login');
                },
                onError(err) {
                    stopLoading();
                    let responseError = null;

                    err.graphQLErrors.forEach(error => {
                        if(error.extensions.code === "BAD_USER_INPUT" && error.message === "Username exists") {
                            //alertRef.current.classList.remove("hidden");
                            responseError = error;
                        }
                    });

                    if(responseError) { alertRef.current.classList.remove("hidden"); }
                    else errorHandler(err);
                }
            })
        }
    }, [ hasFormError, errorHandler, mutation, router, startLoading, stopLoading ]);

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
            inputRef={nameRef}
            required
            variant="outlined"
        />
    ), []);

    const usernameMemo = useMemo(() => (
        <TextField
            error={hasUsernameError}
            id="username-textfield"
            inputRef={userNameRef}
            label="Username"
            fullWidth
            className={classNames("mt-4")}
            required
            variant="outlined"
            onChange={inputChangeHandler(setUsername)}
        />
    ), [  hasUsernameError, inputChangeHandler, setUsername ]);

    const passwordMemo = useMemo(() => (
        <TextField
            error={hasPasswordError}
            id="password-textfield"
            label="Password"
            fullWidth
            className={classNames("mt-4")}
            inputRef={passwordRef}
            required
            type="password"
            variant="outlined"
            onChange={inputChangeHandler(setPassword)}
        />
    ), [ hasPasswordError, inputChangeHandler ]);

    const comfirmPasswordMemo = useMemo(() => (
        <TextField
            error={hasComfirmPasswordError}
            id="confirm-password-textfield"
            label="Confirm Password"
            fullWidth
            className={classNames("mt-4")}
            inputRef={comfirmPasswordRef}
            required
            type="password"
            variant="outlined"
            onChange={inputChangeHandler(setComfirmPassword)}
        />
    ), [ hasComfirmPasswordError, inputChangeHandler ]);

    return (
        <div className="min-h-screen flex items-center justify-center w-full px-5 md:px-0">
            <Paper 
                className={classNames(classes.loginContainer, `px-5 py-8 md:px-6`)}
                component="form"
                elavation={0}
                onSubmit={onSubmitHandler}>
                <fieldset>
                    { legendMemo }
                    <Alert className={classNames("hidden mb-4")} ref={alertRef} severity="error">
                        <AlertTitle>Error</AlertTitle>
                        Username not available!
                    </Alert>
                    { nameMemo }
                    { usernameMemo }
                    { usernameErrorsPanel }
                    { passwordMemo }
                    { passwordErrorsPanel }
                    { comfirmPasswordMemo }
                    { comfirmPasswordErrorsPanel }
                </fieldset>
                <div 
                    className={classNames("flex flex-col items-center mt-4")}>
                    <Typography component="p" className="ml-4 text-sm">
                        do you have an account? 
                        <Link href="/login">
                            <a className={classNames(classes.signUpLink, "ml-2 underline hover:opacity-90")}>
                                sign in.
                            </a>
                        </Link>
                    </Typography>
                    <Button 
                        className="mt-4 py-2 w-full"
                        disabled={hasFormError}
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