import { useLazyQuery, useSubscription } from "@apollo/client"
import { useCallback, useContext, useEffect } from "react"

import { LoginContext } from "src/context/LoginContext"

import { GET_FEEDBACKS } from "src/graphql/queries"
import { DELETE_FEEDBACK_SUBSCRIPTION, GET_FEEDBACK__SUBSCRIPTION, GET_FEEDBACKS__SUBSCRIPTION } from "src/graphql/subscriptions"

export const useFeedbacksQuery = () => {
    const { user } = useContext(LoginContext);

    const subscription = useSubscription(GET_FEEDBACKS__SUBSCRIPTION);
    const feedbackSubscription = useSubscription(GET_FEEDBACK__SUBSCRIPTION, { 
        variables: { 
            id: "null"
        } 
    });
    const [ getFeedbacks, { data, loading, error, subscribeToMore } ] = useLazyQuery(GET_FEEDBACKS);

    const updateAllFeedbacks = useCallback((newFeedback) => {
        subscribeToMore({
            document: GET_FEEDBACKS__SUBSCRIPTION,
            updateQuery: (prev, { subscriptionData }) => {
                console.log(prev)
                if (!subscriptionData.data) return prev;
                const newFeedItem = subscriptionData.data.feedbackCreated;
                console.log(prev);

                return Object.assign({}, prev, {
                    feedbacks: [ newFeedItem, ...prev.feedbacks ]
                });
            }
        });
    }, [ subscribeToMore ])

    useEffect(() => {
        if(user) {
            subscribeToMore({
                document: GET_FEEDBACK__SUBSCRIPTION,
                variables: { id: "null" },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;

                    const feedbacks = prev.feedbacks ? [ ...prev.feedbacks ] : [];
                    const feedback = subscriptionData.data.feedbackUpdated;
                    const index = feedbacks.findIndex(element => element.ID === feedback.ID);
                    feedbacks[index] = feedback;

                    return Object.assign({}, prev, {
                        feedbacks
                    });
                }
            });
        }
    }, [ feedbackSubscription, subscribeToMore, user ]); //

    useEffect(() => {
        if(user) {
            subscribeToMore({
                document: DELETE_FEEDBACK_SUBSCRIPTION,
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;

                    const feedback = subscriptionData.data.feedbackDeleted;
                    const feedbacks = [ ...prev.feedbacks.filter(item => item.ID !== feedback.ID) ];

                    return Object.assign({}, prev, {
                        feedbacks
                    });
                }
            });
        }
    }, [ feedbackSubscription, subscribeToMore, user ]);

    useEffect(() => {
        if(user) {
            updateAllFeedbacks();
        }
    }, [ updateAllFeedbacks, user ]);

    return { data, error, loading };
};