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
                rootRef.current.classList.add("remove-root-padding")
            }
        } else {
            rootRef.current.classList.remove("remove-root-padding")
        }
    }, [ router, user ]);

    return (
        <>
            <LinearProgress className={classNames({ "hidden": !isLoading }, `fixed top-0 left-0 w-full z-10`)} />
            <div id="root" ref={rootRef}>
                { children }
            </div>
        </>
    );
};

export default Container;