import { createContext, useEffect, useState } from 'react';
import { useQuery, useSubscription } from "@apollo/client"
import { GET_FEEDBACKS } from 'src/graphql/queries';
import { GET_FEEDBACKS__SUBSCRIPTION } from 'src/graphql/subscriptions';

export const FeedbacksContext = createContext();
FeedbacksContext.displayName = "FeedbacksContext";

export const FeedbacksContextProvider = ({ children }) => {
    const [ feedbacksList, setFeedbackList ] = useState([]);

    const subscription = useSubscription(GET_FEEDBACKS__SUBSCRIPTION)
    const { subscribeToMore, ...result } = useQuery(GET_FEEDBACKS);

    useEffect(() => {
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
            setFeedbackList(data.feedbacks)
         }
    }, [ result ]);

    return (
        <FeedbacksContext.Provider value={{ feedbacksList }}>
            { children }
        </FeedbacksContext.Provider>
    );
};
