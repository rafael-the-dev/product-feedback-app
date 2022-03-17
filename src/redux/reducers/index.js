import { initialState } from '../state'
import { addProduct, addProducts, removeFeedback } from '../actions';

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
}

export const productsReducer = (state=initialState, action) => {
    switch(action.type) {
        case addProduct().type: {
            return addNewFeedback(state, action.payload);
        }
        case addProducts().type: {
            return { ...state, products: action.payload };
        }
        case removeFeedback().type: {
            return deleteFeedback(state, action.payload);
        }
        default: {
            return state;
        }
    }
};