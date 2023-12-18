<template>
  <button class="buttonUi">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'my-button'
}
</script>

<style scoped>
.buttonUi {
  cursor: pointer;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  outline: 1px solid teal;
  background-color: transparent;
}
</style>