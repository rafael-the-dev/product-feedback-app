import { createContext, useEffect, useRef, useState } from 'react';
import data from '../data.json';

export const AppContext = createContext();
AppContext.displayName = 'AppContext';

export const AppContextProvider = ({ children }) => {
    const localStoraFeedbacksName = useRef('feedback-app__feedbacks');

    const [ feedbacksList, setFeedbackList ] = useState([]);

    useEffect(() => {
        if(!Boolean(localStorage.getItem(localStoraFeedbacksName.current))) {
            setFeedbackList([ ...data.productRequests, ])
        } else {
            const list = [ ...JSON.parse(localStorage.getItem(localStoraFeedbacksName.current))];
            setFeedbackList(list)
        }
    }, []);

    useEffect(() => {
        if(feedbacksList.length > 0)
            localStorage.setItem(localStoraFeedbacksName.current, JSON.stringify(feedbacksList));
    }, [ feedbacksList ])

    return (
        <AppContext.Provider value={{ feedbacksList, setFeedbackList }}>{ children }</AppContext.Provider>
    );
};