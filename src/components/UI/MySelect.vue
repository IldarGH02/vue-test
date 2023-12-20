<template>
  <select
      :value="modelValue"
      @change="changeOption"
      class="select-filter"
  >
    <option
        disabled
        value=""
    >
      Выберите из списка
    </option>
    <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'my-select',
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeOption(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
.select-filter {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  outline: 1px solid teal;
}
</style>