export default {
  addProductToCart({ commit }, product) {
    commit('addProductToCart', product);
  },
  updateProductsCount({ commit }, product) {
    commit('updateProductsCount', product);
  },
  setProductsCart({ commit }, cart) {
    commit('setProductsCart', cart);
  },
};
