import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { LoginContext } from 'src/context/LoginContext';

const Container = ({ children }) => {
    const router = useRouter();
    const { user } = useContext(LoginContext)

    useEffect(() => {
        const { pathname } = router;
        if(![ '/login', '/signup' ].includes(pathname) && user === null) {
            router.push("/login")
        }
    }, [ router, user ]);

    return (
        <div id="root">
            { children }
        </div>
    );
};

export default Container;