export const selectFeedbackByID = id => state => state.products.find(item => item.id === id);
export const selectAllProducts = state => state.products;