<template v-cloak>
  <Shop />
</template>

<script>
import Shop from "./views/Shop.vue";

export default {
  name: "app",
  components: {
    Shop
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap");

*,
*::after,
::before {
  margin: 0;
  padding: 0;
}

html {
  font-family: "Roboto", sans-serif;
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

button {
  cursor: pointer;
  border: none;
  background: $button-color;
  font-weight: bold;
  border-radius: 5px;

  &:hover,
  &:focus {
    border: 2px dotted black;
  }
}
</style>
