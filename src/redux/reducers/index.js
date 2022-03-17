import { initialState } from '../state'
import { addProduct, addProducts } from '../actions';

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
}

export const productsReducer = (state=initialState, action) => {
    switch(action.type) {
        case addProduct().type: {
            return addNewFeedback(state, action.payload);
        }
        case addProducts().type: {
            return { ...state, products: action.payload };
        }
        default: {
            return state;
        }
    }
};