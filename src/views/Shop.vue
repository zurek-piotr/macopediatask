<template>
  <section class="shop">
    <Cart />
    <h2 class="shop__header">Produkty</h2>
    <select class="shop__orderBy" v-model="currentOrder">
      <option value="">Sortuj</option>
      <option value="price">Cena</option>
      <option value="name">Nazwa</option>
    </select>
    <div class="shop__products">
      <div
        class="shop__products__product"
        v-for="product in orderedProducts"
        :key="product.id"
      >
        <div
          class="shop__products__product__picture"
          :style="{ backgroundImage: 'url(' + product.imgURL + ')' }"
        ></div>
        <div class="shop__products__product__name">{{ product.name }}</div>
        <div class="shop__products__product__price">
          {{ product.price }} {{ product.currency }}
        </div>
        <button
          class="button button__addProduct"
          @click.prevent="AddToCart(product)"
        >
          Dodaj do koszyka
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import orderby from 'lodash.orderby';
import products from '../data/Products.json';
import Cart from '../components/Cart.vue';
import store from '../store/index';

export default {
  data() {
    return {
      products,
      currentOrder: '',
    };
  },
  computed: {
    orderedProducts() {
      return orderby(this.products, this.currentOrder);
    },
  },
  methods: {
    AddToCart(product) {
      store.commit('addProductToCart', product);
      localStorage.setItem('products', JSON.stringify(store.state.cart));
    },
  },
  components: {
    Cart,
  },
};
</script>

<style lang="scss" scoped>
.shop {
  &__header {
    display: inline-block;
    font-size: 1.5em;
    margin: 25px 50px;
  }

  &__orderBy {
    width: 100px;
    height: 40px;
    font-size: 1.2em;
    padding: 5px;
    border: 2px solid $primary-color;
  }

  &__products {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 150px 100px;
    margin: 100px 50px;

    &__product {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-content: center;
      align-items: center;
      background: $primary-color;
      border-radius: 20px;
      padding: 30px 20px;

      &__picture {
        height: 100px;
        width: 100px;
        background-size: contain;
        border-radius: 50%;
      }

      &__name {
        margin: 20px 0;
        font-weight: bold;
        font-size: 1.2em;
      }

      &__price {
        margin-bottom: 10px;
        font-size: 1.1em;
      }
    }
  }
}

.button {
  &__addProduct {
    width: 150px;
    height: 40px;
  }
}

@media screen and (min-width: 1024px) {
  .shop {
    &__products {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}

@media screen and (min-width: 1440px) {
  .shop {
    &__products {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

@media screen and (min-width: 2560px) {
  .shop {
    &__products {
      grid-template-columns: repeat(5, 1fr);
    }
  }
}
</style>
