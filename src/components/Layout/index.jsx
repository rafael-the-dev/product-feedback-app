import { useRouter } from 'next/router'
import { useMemo, useRef } from 'react'
import { useContext, useEffect } from 'react'
import { Alert, AlertTitle, Collapse, LinearProgress } from "@mui/material"
import classNames from 'classnames'

import { LoginContext } from 'src/context/LoginContext';
import { AppContext } from 'src/context/AppContext';

const Container = ({ children }) => {
    const router = useRouter();
    const { pathname } = router;

    const { user } = useContext(LoginContext)
    const { isLoading, hasError } = useContext(AppContext)

    const rootRef = useRef(null);

    const isLogged = useMemo(() => (![ '/login', '/signup' ].includes(pathname)) && user !== null, [ pathname, user ])

    useEffect(() => {
        if([ '/login' ].includes(pathname) && user !== null) {
            router.push("/")
        }else if(!isLogged && (![ '/login', '/signup' ].includes(pathname))) {
            router.push("/login")
        }
    }, [ isLogged, pathname, router, user ]);

    useEffect(() => {
        if(isLogged) { //[ '/login', '/signup' ].includes(pathname)
            if(rootRef.current !== null) {
                rootRef.current.classList.remove("remove-root-padding")
            }
        } 

        if(!isLogged){
            if(rootRef.current !== null) {
                rootRef.current.classList.add("remove-root-padding")
            }
        }
    }, [ isLogged ])

    //if(!isLogged) return <></>;

    return (
        <>
            <LinearProgress className={classNames({ "hidden": !isLoading }, `fixed top-0 left-0 w-full z-10`)} />
            <Collapse in={ hasError }>
                <Alert className={classNames()} severity="error">
                    <AlertTitle>Error</AlertTitle>
                   Username or password invalid!
                </Alert>
            </Collapse>
            <div id="root" ref={rootRef}>
                { children }
            </div>
        </>
    );
};

export default Container;