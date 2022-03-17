import { createStore } from 'redux';
import { productsReducer } from '../reducers'

export const store = createStore(productsReducer);