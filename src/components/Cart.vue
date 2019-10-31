<template>
  <section class="cart">
    <h2 class="cart__header">Koszyk</h2>
    <button
      class="button button__toggleCart"
      @click.prevent="isOpen ? toggleIsOpen(false) : toggleIsOpen(true)"
    >
      {{ isOpen && products.length > 0 ? "Ukryj koszyk" : "Rozwiń koszyk" }}
      <div class="button__toggleCart__amount">{{ products.length }}</div>
    </button>
    <div class="cart__products" v-show="isOpen">
      <div class="cart__products__emptyCart" v-show="products.length < 1">
        Twój koszyk jest pusty
      </div>
      <div
        class="cart__products__product"
        v-for="product in products"
        :key="product.id"
      >
        <div
          class="cart__products__product__picture"
          :style="{ backgroundImage: 'url(' + product.imgURL + ')' }"
        ></div>
        <div class="cart__products__product__name">{{ product.name }}</div>
        <div class="cart__products__product__countWrapper">
          <input
            class="cart__products__product__countWrapper__count"
            type="number"
            min="0"
            step="1"
            v-model.number="product.count"
            @change.prevent="updateProductCount(product)"
          /><br />

          <button
            class="button button__operator"
            @click.prevent="product.count++, updateProductCount(product)"
          >
            +
          </button>
          <button
            class="button button__operator"
            @click.prevent="product.count--, updateProductCount(product)"
          >
            -
          </button>
        </div>
        <div class="cart__products__product__price">
          {{ product.price * product.count }} {{ product.currency }}
        </div>
      </div>
      <span class="cart__products__summary" v-show="products.length > 0"
        >Suma: {{ getTotalPrice() }}</span
      >
    </div>
  </section>
</template>

<script>
import store from '../store/index';

export default {
  data() {
    return {
      products: store.state.cart,
    };
  },
  props: ['isOpen'],
  methods: {
    updateProductCount(product) {
      store.commit('updateProductsCount', product);
      localStorage.setItem('products', JSON.stringify(this.products));
    },
    getTotalPrice() {
      let totalPrice = 0;
      const currency = 'zł';
      this.products.forEach((product) => { (totalPrice) += product.count * product.price; });
      return `${totalPrice} ${currency} `;
    },
    toggleIsOpen(data) {
      this.$emit('changeIsOpen', data);
    },
  },
  mounted() {
    if (localStorage.getItem('products')) {
      this.products = JSON.parse(localStorage.getItem('products'));
      store.commit('setProductsCart', this.products);
    }
  },
};
</script>

<style lang="scss" scoped>
.cart {
  margin: 50px;

  &__header {
    font-size: 1.5em;
    margin: 25px 0;
  }

  &__products {
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    &__product {
      display: flex;
      flex-direction: column;
      margin: 10px 0 30px 0;
      justify-content: space-between;
      align-items: center;

      &__picture {
        height: 100px;
        width: 100px;
        border-radius: 50%;
        background-size: contain;
      }
      &__name {
        text-align: center;
        margin: 10px 0;
      }
      &__price {
        font-size: 1.2em;
      }
      &__countWrapper {
        display: flex;
        width: 80px;
        flex-wrap: wrap;
        align-items: center;
        align-content: center;
        justify-content: center;
        margin: 10px 0;

        &__count {
          height: 30px;
          width: 40px;
          text-align: center;
          border: 1px solid black;
        }
      }
    }
    &__summary {
      font-size: 1.2em;
      align-self: flex-end;
    }
  }
}
.button {
  &__toggleCart {
    width: 180px;
    height: 40px;
    font-size: 1em;

    &__amount {
      display: inline-block;
      background: $primary-color;
      border-radius: 50%;
      width: 20px;
      margin-left: 10px;
    }
  }
  &__operator {
    width: 20px;
    height: 20px;
    margin-left: 10px;
  }
}

@media screen and (min-width: 768px) {
  .cart {
    width: 60vw;
    &__products {
      &__product {
        flex-direction: row;

        &__countWrapper {
          &__count {
            width: 80px;
            height: 30px;
          }
        }
      }
    }
  }
}

.button {
  &__operator {
    width: 30px;
    height: 30px;
    margin: 10px 0 0 10px;
  }
}

@media screen and (min-width: 2560px) {
  .cart {
    &__products {
      &__product {
        &__name {
          font-size: 1.5em;
        }
        &__price {
          font-size: 1.5em;
        }
      }
      &__summary {
        font-size: 1.8em;
      }
    }
  }
}
</style>
