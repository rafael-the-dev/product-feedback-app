import { useRouter } from 'next/router'
import { useRef } from 'react'
import { useContext, useEffect } from 'react'
import { LinearProgress } from "@mui/material"
import classNames from 'classnames'

import { LoginContext } from 'src/context/LoginContext';
import { AppContext } from 'src/context/AppContext';

const Container = ({ children }) => {
    const router = useRouter();

    const { user } = useContext(LoginContext)
    const { isLoading } = useContext(AppContext)

    const rootRef = useRef(null)

    useEffect(() => {
        const { pathname } = router;
        if(![ '/login', '/signup' ].includes(pathname) && user === null) {
            router.push("/login")
        }

        if([ '/login', '/signup' ].includes(pathname)) {
            if(rootRef.current !== null) {
                rootRef.current.style.padding = 0;
            }
        }
    }, [ router, user ]);

    return (
        <>
            <LinearProgress className={classNames({ "hidden": !isLoading })} />
            <div id="root" ref={rootRef}>
                { children }
            </div>
        </>
    );
};

export default Container;