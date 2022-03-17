import { initialState } from '../state'
import { addProduct, addProducts } from '../actions'

export const productsReducer = (state=initialState, action) => {
    switch(action.type) {
        case addProduct().type: {
            return {};
        }
        case addProducts().type: {
            return {};
        }
        default: {
            return state;
        }
    }
};