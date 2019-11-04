export default {
  addProductToCart(state, product) {
    if (state.cart.filter(el => el.id === product.id).length > 0) {
      const index = state.cart.findIndex(el => el.id === product.id);
      state.cart[index].count += 1;
    } else {
      product.count += 1;
      state.cart.push(product);
    }
  },
  updateProductsCount(state, product) {
    const index = state.cart.indexOf(product);
    if (state.cart[index].count === 0) {
      state.cart.splice(index, 1);
    } else {
      state.cart[index].count = product.count;
    }
  },
  setProductsCart(state, cart) {
    state.cart = cart;
  },
};
