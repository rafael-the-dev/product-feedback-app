import { initialState } from '../state'
import { addProduct, addProducts } from '../actions'

export const productsReducer = (state=initialState, action) => {
    switch(action.type) {
        case addProduct().type: {
            return {};
        }
        case addProducts().type: {
            return { ...state, products: action.payload };
        }
        default: {
            return state;
        }
    }
};