<template>
  <div class="app">
    <navbar/>
    <router-view>

    </router-view>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
export default {
  components: {Navbar}
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  min-width: 320px;
  scroll-behavior: smooth;
}

.container {
  max-width: 1640px;
  margin: 0 auto;
}
</style>