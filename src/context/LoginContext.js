import { createContext, useCallback, useState } from 'react'

export const LoginContext = createContext();
LoginContext.displayName = "LoginContext";

export const LoginContextProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const addUser = useCallback((loggedUser) => {
        setUser(loggedUser)
    }, []);

    return (
        <LoginContext.Provider value={{ addUser, user }}>
            { children }
        </LoginContext.Provider>
    );
};