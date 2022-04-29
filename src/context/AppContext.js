import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import data from 'src/data.json';
import { useDispatch, useSelector } from 'react-redux'
import { addProducts } from 'src/redux/actions'
import { selectAllProducts } from 'src/redux/selectors'

export const AppContext = createContext();
AppContext.displayName = 'AppContext';

export const AppContextProvider = ({ children }) => {
    const dispatch = useDispatch();
    const allFeedbacks = useSelector(selectAllProducts);

    const localStoraFeedbacksName = useRef('feedback-app__feedbacks');

    const [ feedbacksList, setFeedbackList ] = useState([]);

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

    const nextUser = useRef({ name: 'unknown'});
    const generateNextUser = useCallback(() => {
        let user = usersList[Math.floor(Math.random() * usersList.length)];
        while(user.name === nextUser.current.name) {
            user = usersList[Math.floor(Math.random() * usersList.length)];
        }
        nextUser.current = user;
    }, [ usersList ]);

    useEffect(() => generateNextUser(), [ generateNextUser ], [])

    useEffect(() => {
        if(!Boolean(localStorage.getItem(localStoraFeedbacksName.current))) {
            setFeedbackList([ ...data.productRequests, ])
            dispatch(addProducts([ ...data.productRequests, ]))
        } else {
            const list = [ ...JSON.parse(localStorage.getItem(localStoraFeedbacksName.current))];
            setFeedbackList(list)
            dispatch(addProducts(list))
        }
    }, [ dispatch ]);

    useEffect(() => {
        if(allFeedbacks.length > 0)
            localStorage.setItem(localStoraFeedbacksName.current, JSON.stringify(allFeedbacks));
    }, [ allFeedbacks ]);

    return (
        <AppContext.Provider value={{ feedbacksList, generateNextUser, nextUser, setFeedbackList }}>{ children }</AppContext.Provider>
    );
};