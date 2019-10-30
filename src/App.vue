<template>
  <Shop />
</template>

<script>
import Shop from './views/Shop.vue';

export default {
  name: 'app',
  components: {
    Shop,
  },
};
</script>

<style lang="scss">
*,
*::after,
::before {
  margin: 0;
  padding: 0;
}

html {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  scroll-behavior: smooth;
}

*::after,
*::before {
  box-sizing: inherit;
}

input,
textarea,
select,
button,
::placeholder {
  font-family: inherit;
}

[v-cloak] {
  display: hidden;
}
</style>
