<template>
  <input :value="modelValue"  @input="updateInput" type="text" class="input">
</template>

<script>
export default {
  name: 'my-input',
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
.input {
  width: 100%;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  outline: 1px solid teal;
}
</style>