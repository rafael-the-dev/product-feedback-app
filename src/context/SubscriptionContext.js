import { createContext, useMemo } from 'react'
import { useFeedbacksQuery } from "src/hooks"

export const SubscriptionContext = createContext();
SubscriptionContext.displayName = "SubscriptionContext";

export const SubscriptionContextProvider = ({ children }) => {
    const { data } = useFeedbacksQuery();

    const feedbacksList = useMemo(() => {
        if(data) {
            return data.feedbacks;
        }
        return [];
    }, [ data ]);

    return (
        <SubscriptionContext.Provider value={{ feedbacksList }}>
            { children }
        </SubscriptionContext.Provider>
    );
};