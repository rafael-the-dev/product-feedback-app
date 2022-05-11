import { createContext, useCallback, useState } from 'react'

export const LoginContext = createContext();
LoginContext.displayName = "LoginContext";

export const LoginContextProvider = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const addUser = useCallback((loggedUser) => {
        setUser(loggedUser)
    }, []);

    const logout = useCallback(() => setUser(null), []);

    return (
        <LoginContext.Provider value={{ addUser, logout, user }}>
            { children }
        </LoginContext.Provider>
    );
};