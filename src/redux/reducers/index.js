import { initialState } from '../state'
import { addComent, addProduct, addProducts, editFeedback, incrementUpvotes, removeFeedback } from '../actions';

const addNewFeedback = (state, data) => {
    const newFeedback = {
        "id": state.products.length + 1,
        "title": data['feadback-title'],
        "category": data['feadback-category'],
        "upvotes": 0,
        "status": "suggestion",
        "description": data['feadback-detail'],
        "comments": []
    };
    return { ...state, products: [ ...state.products, newFeedback ] };
};

const addNewComment = (state, payload) => {
    const { commentRef, feedback, generateNextUser, nextUser, setComment } = payload;
    const products = [ ...state.products ];
    const result = products.find(item => item.id === feedback.id);

    if(result) {
        const commentsList =  result.comments ?  result.comments : [];
        const commentID = commentsList.length + 1;
        result.comments = [ ...commentsList, 
            {
                "id": commentID,
                "content": commentRef.current,
                "user": nextUser.current
            }
        ];

        setComment('');
        generateNextUser()
    }
    return { ...state, products };
};

const deleteFeedback = (state, feedback) => {
    const products = state.products.filter(item => item.id !== feedback.id);
    return { ...state, products };
};

const incrementUpvotesNumber = (state, feedback) => {
    const list = [ ...state.products ];
    const result = list.find(item => item.id === feedback.id);

    if(result) {
        result.upvotes += 1;
    }

    return { ...state, products: list };
};

const editFeedbackFunc = (state, feedback) => {
    const products = [ ...state.products ];
    const result = products.find(item => item.id === feedback.id);

    if(result) {
        result.title = feedback.title;
        result.description = feedback.description;
        result.status = feedback.status;
        result.category = feedback.category;
    }

    return { ...state, products };
};

export const productsReducer = (state=initialState, action) => {
    switch(action.type) {
        case addComent().type: {
            return addNewComment(state, action.payload);
        }
        case addProduct().type: {
            return addNewFeedback(state, action.payload);
        }
        case addProducts().type: {
            return { ...state, products: action.payload };
        }
        case editFeedback().type: {
            return editFeedbackFunc(state, action.payload);
        }
        case incrementUpvotes().type: {
            return incrementUpvotesNumber(state, action.payload);
        }
        case removeFeedback().type: {
            return deleteFeedback(state, action.payload);
        }
        default: {
            return state;
        }
    }
};