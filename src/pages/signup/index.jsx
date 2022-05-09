import { Button, FormControl, InputAdornment, InputLabel, IconButton, OutlinedInput, Paper, TextField, Typography } from '@mui/material';
import { useCallback, useMemo, useRef } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import classes from './styles.module.css'

const Container = () => {
    const userNameRef = useRef(null);
    const onSubmitHandler = useCallback(() => {}, []);

    const legendMemo = useMemo(() => (
        <Typography component="legend" className="font-bold mb-8 text-center text-2xl uppercase">
            Sign up
        </Typography>
    ), []);

    const nameMemo = useMemo(() => (
        <TextField
            id="username-textfield"
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
            id="username-textfield"
            label="Password"
            fullWidth
            className={classNames("mt-4")}
            required
            type="password"
            variant="outlined"
        />
    ), []);

    const comfirmPassword = useMemo(() => (
        <TextField
            id="username-textfield"
            label="Confirm Password"
            fullWidth
            className={classNames("mt-4")}
            required
            type="password"
            variant="outlined"
        />
    ), []);

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
                    { comfirmPassword }
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