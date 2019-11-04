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
            @keypress="isInteger($event)"
            @change.prevent="updateProductCount(product)"
          /><br />
          <div class="cart__products__product__countWrapper__operatorsWrapper">
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
import { mapActions } from 'vuex';
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
      this.updateProductsCount(product);
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
    isInteger(event) {
      if (!/\d/.test(event.key)) return event.preventDefault();
      return true;
    },
    ...mapActions(['updateProductsCount']),
  },
  mounted() {
    if (localStorage.getItem('products')) {
      this.products = JSON.parse(localStorage.getItem('products'));
      store.dispatch('setProductsCart', this.products);
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
    display: grid;
    grid-row-gap: 50px;
    margin-top: 50px;

    &__product {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      justify-items: center;
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

        &__operatorsWrapper {
          display: flex;
          justify-content: space-between;
          margin-top: 5px;
          width: 100%;
        }

        &__count {
          height: 30px;
          width: 80px;
          text-align: center;
          border: 1px solid black;
        }
      }
    }
    &__summary {
      font-size: 1.2em;
      justify-self: end;
      font-weight: bold;
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
  }
}

@media screen and (min-width: 768px) {
  .cart {
    width: 90vw;
    &__products {
      &__product {
        grid-template-columns: repeat(4, 1fr);
        justify-items: center;
        align-items: center;
      }
    }
  }
}

.button {
  &__operator {
    width: 30px;
    height: 30px;
  }
}

@media screen and (min-width: 2560px) {
  .cart {
    width: 70vw;
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
