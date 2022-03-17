export const addProducts = (productsList) => ({
    payload: productsList,
    type: 'ADD_ALL_PRODUCTS'
});

export const addProduct = (product) => ({
    payload: product,
    type: 'ADD_PRODUCT'
});

export const editFeedback = (product) => ({
    payload: product,
    type: 'EDIT_PRODUCT'
});

export const removeFeedback = (product) => ({
    payload: product,
    type: 'REMOVE_PRODUCT'
});