import { initialState } from '../state'
import { addComent, addProduct, addProducts, editFeedback, incrementUpvotes, removeFeedback, replayComment } from '../actions';

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
    const { commentRef, feedback, generateNextUser, nextUser, setComment, setOpenOpenCommentSnackbar } = payload;
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
        setOpenOpenCommentSnackbar(true);
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

const replayCommentFunc = (state, payload) => {
    const { commentID, content, feedbackID, setIsSuccefulReply, username, nextuser } = payload;
    const products = [ ...state.products ];
    const result = products.find(item => item.id === feedbackID);

    if(result) {
        const userComment = result.comments.find(item => item.id === commentID);

        if(userComment) {
            const repliesList =  userComment.replies ?  userComment.replies : [];
            userComment.replies = [ ...repliesList, 
                {
                    "content": content,
                    "replyingTo": username,
                    "user": nextuser
                    }
            ];
        }

        setIsSuccefulReply(true);
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
        case replayComment().type: {
            return replayCommentFunc(state, action.payload);
        }
        case removeFeedback().type: {
            return deleteFeedback(state, action.payload);
        }
        default: {
            return state;
        }
    }
};