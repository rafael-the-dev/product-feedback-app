import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

import { SubscriptionContext } from "./SubscriptionContext"

export const AppContext = createContext();
AppContext.displayName = 'AppContext';

export const AppContextProvider = ({ children }) => {
    const { feedbacksList } = useContext(SubscriptionContext);

    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState({ hasError: false, errorMessage: "" })

    const startLoading = useCallback(() => setIsLoading(true), [])
    const stopLoading = useCallback(() => setIsLoading(false), [])

    const addError = useCallback(({ hasError, errorMessage }) => setError({ hasError, errorMessage }), [])

    const usersList = useMemo(() => [
        {
            "image": "image-zena.jpg",
            "name": "Zena Kelley",
            "username": "velvetround"
        },{
            "image": "image-suzanne.jpg",
            "name": "Suzanne Chang",
            "username": "upbeat1811"
        },{
            "image": "image-thomas.jpg",
            "name": "Thomas Hood",
            "username": "brawnybrave"
        },{
            "image": "image-elijah.jpg",
            "name": "Elijah Moss",
            "username": "hexagon.bestagon"
        },{
            "image": "image-james.jpg",
            "name": "James Skinner",
            "username": "hummingbird1"
        },{
            "image": "image-anne.jpg",
            "name": "Anne Valentine",
            "username": "annev1990"
        },{
            "image": "image-ryan.jpg",
            "name": "Ryan Welles",
            "username": "voyager.344"
        },{
            "image": "image-george.jpg",
            "name": "George Partridge",
            "username": "soccerviewer8"
        },{
            "image": "image-javier.jpg",
            "name": "Javier Pollard",
            "username": "warlikeduke"
        },{
            "image": "image-roxanne.jpg",
            "name": "Roxanne Travis",
            "username": "peppersprime32"
        },{
            "image": "image-jackson.jpg",
            "name": "Jackson Barker",
            "username": "countryspirit"
        },{
            "image": "image-victoria.jpg",
            "name": "Victoria Mejia",
            "username": "arlen_the_marlin"
        },{
            "image": "image-george.jpg",
            "name": "George Partridge",
            "username": "soccerviewer8"
        }, 
    ], []);

    const getInitialsNameLetters = useCallback(name => {
        let result = "";
    
        if (name && typeof name === "string") {
          let splittedName = name.split(" ");
    
          if (splittedName.length === 0) {
            splittedName = name.split("-");
          }

          if (splittedName.length > 2) {
            result = splittedName[0].charAt(0) + splittedName[splittedName.length - 1].charAt(0);
          } else {
            splittedName.forEach((item) => (result += item.charAt(0)));
          }
        }
        return result;
    }, []);

    const errorHandler = useCallback((err) => {
        console.log(err)
        err.graphQLErrors.forEach(error => {
            switch(error.extensions.code) {
                case "BAD_USER_INPUT": {
                    addError({ hasError: true, errorMessage: error.message })
                    return;
                }
                default: {
                    addError({ hasError: true, errorMessage: error.message });
                    return;
                }
            }
        })
    }, [ addError ]);

    const nextUser = useRef({ name: 'unknown'});
    const generateNextUser = useCallback(() => {
        let user = usersList[Math.floor(Math.random() * usersList.length)];
        while(user.name === nextUser.current.name) {
            user = usersList[Math.floor(Math.random() * usersList.length)];
        }
        nextUser.current = user;
    }, [ usersList ]);

    useEffect(() => generateNextUser(), [ generateNextUser ], [])

    return (
        <AppContext.Provider 
            value={{ ...error.hasError, errorHandler, feedbacksList, getInitialsNameLetters, generateNextUser, isLoading, nextUser, 
            refreshAllFeedbacks: () => {}, startLoading, stopLoading, updateAllFeedbacks: () => {} }}>
            { children }
        </AppContext.Provider>
    );
};