export const addProducts = (productsList) => ({
    payload: productsList,
    type: 'ADD_ALL_PRODUCTS'
});

export const addProduct = (product) => ({
    payload: product,
    type: 'ADD_PRODUCT'
});