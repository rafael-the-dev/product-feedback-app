import { initialState } from '../state'
import { addProduct, addProducts, editFeedback, removeFeedback } from '../actions';

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

const deleteFeedback = (state, feedback) => {
    const products = state.products.filter(item => item.id !== feedback.id);
    return { ...state, products };
};

const editFeedbackFunc = (state, feedback) => {
    const result = state.products.find(item => item.id === feedback.id);

    if(result) {
        result.title = feedback.title;
        result.description = feedback.description;
        result.status = feedback.status;
        result.category = feedback.category;
    }

    return { ...state };
};

export const productsReducer = (state=initialState, action) => {
    switch(action.type) {
        case addProduct().type: {
            return addNewFeedback(state, action.payload);
        }
        case addProducts().type: {
            return { ...state, products: action.payload };
        }
        case editFeedback().type: {
            return editFeedbackFunc(state, action.payload);
        }
        case removeFeedback().type: {
            return deleteFeedback(state, action.payload);
        }
        default: {
            return state;
        }
    }
};