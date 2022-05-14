import { createContext, useCallback, useEffect, useRef, useState } from 'react'
import { useMutation } from '@apollo/client'
import { VALIDATE_TOKEN } from "src/graphql/mutations"

export const LoginContext = createContext();
LoginContext.displayName = "LoginContext";

export const LoginContextProvider = ({ children }) => {
    const validateToken = useMutation(VALIDATE_TOKEN);
    const isFirstRender = useRef(true);

    const [ user, setUser ] = useState(null);
    const addUser = useCallback((loggedUser) => {
        setUser(loggedUser)
    }, []);

    const logout = useCallback(() => setUser(null), []);

    useEffect(() => {
        const token = localStorage.getItem("__product-feedback-app-token") || "";
        const validate = validateToken[0];
        if(isFirstRender.current) {
            validate({ 
                variables: {
                    token
                },
                onCompleted(data) {
                    //console.log(data)
                    if(data) {
                        const { name, username } = data.validateToken;
                        addUser({ name, username })
                    }
                },
                onError(err) {
                    console.log(err)
                }
            });
        }
        isFirstRender.current = false;

        return () => {
            if(isFirstRender.current) {
                isFirstRender.current = false;
            }
        };
    }, [ validateToken ])

    return (
        <LoginContext.Provider value={{ addUser, logout, user }}>
            { children }
        </LoginContext.Provider>
    );
};