<template>
  <div class="dialog" v-if="show" @click.stop="hideDialog">
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import toggleMixin from "@/mixins/toggleMixin";

export default {
  name: 'my-dialog',
  mixins: [
      toggleMixin
  ]
}
</script>

<style scoped>
.dialog {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}

.dialog__content {
  display: flex;
  margin: auto;
  padding: 25px;
  background-color: #fff;
  border-radius: 5px;
  min-height: 50px;
  min-width: 450px;
  justify-content: center;
}
</style>