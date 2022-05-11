import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
//import data from 'src/data.json';
import { useDispatch } from 'react-redux'
import { useQuery, useSubscription } from "@apollo/client"

import { GET_FEEDBACKS } from 'src/graphql/queries';
import { DELETE_FEEDBACK_SUBSCRIPTION, GET_FEEDBACKS__SUBSCRIPTION, GET_FEEDBACK__SUBSCRIPTION } from 'src/graphql/subscriptions';
//import WebSocket from "ws"

export const AppContext = createContext();
AppContext.displayName = 'AppContext';

export const AppContextProvider = ({ children }) => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ feedbacksList, setFeedbackList ] = useState([]);

    const startLoading = useCallback(() => setIsLoading(true), [])
    const stopLoading = useCallback(() => setIsLoading(false), [])

    const feedbackSubscription = useSubscription(GET_FEEDBACK__SUBSCRIPTION, { 
        variables: { 
            id: "null"
        } 
    });

    const deleteFeedbackSubscription = useSubscription(DELETE_FEEDBACK_SUBSCRIPTION);

    //const subscription = useSubscription(GET_FEEDBACKS__SUBSCRIPTION)
    //const { subscribeToMore, ...result } = useQuery(GET_FEEDBACKS);

    //console.log(data)

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

    const nextUser = useRef({ name: 'unknown'});
    const generateNextUser = useCallback(() => {
        let user = usersList[Math.floor(Math.random() * usersList.length)];
        while(user.name === nextUser.current.name) {
            user = usersList[Math.floor(Math.random() * usersList.length)];
        }
        nextUser.current = user;
    }, [ usersList ]);

    useEffect(() => generateNextUser(), [ generateNextUser ], [])

    const subscription = useSubscription(GET_FEEDBACKS__SUBSCRIPTION)
    const { subscribeToMore, ...result } = useQuery(GET_FEEDBACKS);

    const updateAllFeedbacks = useCallback((newFeedback) => {
        //console.log("hello rt")
        subscribeToMore({
            document: GET_FEEDBACKS__SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                console.log(prev)
                if (!subscriptionData.data) return prev;
                const newFeedItem = subscriptionData.data.feedbackCreated;
                console.log(prev);

                return Object.assign({}, prev, {
                feedbacks: [...prev.feedbacks, newFeedItem ]
                });
            }
        });
    }, [ subscribeToMore ])

    useEffect(() => {
        subscribeToMore({
            document: GET_FEEDBACK__SUBSCRIPTION,
            variables: { id: "null" },
            updateQuery: (prev, { subscriptionData }) => {
                console.log(prev)
                console.log(subscriptionData.data)
                if (!subscriptionData.data) return prev;

                const feedbacks = [ ...prev.feedbacks ];
                const feedback = subscriptionData.data.feedbackUpdated;
                const index = feedbacks.findIndex(element => element.ID === feedback.ID);
                feedbacks[index] = feedback;

                return Object.assign({}, prev, {
                    feedbacks
                });
            }
        });
    }, [ feedbackSubscription, subscribeToMore ]);

    useEffect(() => {
        subscribeToMore({
            document: DELETE_FEEDBACK_SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                console.log(prev)
                console.log(subscriptionData.data)
                if (!subscriptionData.data) return prev;

                const feedback = subscriptionData.data.feedbackDeleted;
                const feedbacks = [ ...prev.feedbacks.filter(item => item.ID !== feedback.ID) ];
                //const index = feedbacks.findIndex(element => element.ID === feedback.ID);
                //feedbacks[index] = feedback;

                return Object.assign({}, prev, {
                    feedbacks
                });
            }
        });
    }, [ feedbackSubscription, subscribeToMore ]);

    useEffect(() => {
        updateAllFeedbacks();
    }, [ updateAllFeedbacks ]);
 
    useEffect(() => {
        const data = result.data;
        if(data) {
            setFeedbackList(data.feedbacks)
        }
    }, [ result ]);

    /*useEffect(() => {
        if(!Boolean(localStorage.getItem(localStoraFeedbacksName.current))) {
            setFeedbackList([ ...data.productRequests, ])
            dispatch(addProducts([ ...data.productRequests, ]))
        } else {
            const list = [ ...JSON.parse(localStorage.getItem(localStoraFeedbacksName.current))];
            setFeedbackList(list)
            dispatch(addProducts(list))
        }
    }, [ dispatch ]);*/

    /*useEffect(() => {
       subscribeToMore({
            document: GET_FEEDBACKS__SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;
                const newFeedItem = subscriptionData.data.feedbackCreated;

                return Object.assign({}, prev, {
                feedbacks: [...prev.feedbacks, newFeedItem ]
                });
            }
        })
    }, [ subscribeToMore ])

    useEffect(() => {
        const data = result.data;
        if(data) {
            dispatch(addProducts([ ...data.feedbacks, ]))
        }
    }, [ dispatch, result ]);*/

    return (
        <AppContext.Provider 
            value={{ feedbacksList, getInitialsNameLetters, generateNextUser, isLoading, nextUser, setFeedbackList, 
            startLoading, stopLoading, updateAllFeedbacks }}>
            { children }
        </AppContext.Provider>
    );
};