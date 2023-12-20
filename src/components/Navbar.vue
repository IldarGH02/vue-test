<template>
  <div class="container">
    <div class="navbar">
      <div class="navbar__actions">
        <my-button
            class="navbar__actions-posts navbar-btn"
            @click="$router.push('/posts')"
        >
          Посты
        </my-button>
        <my-button
            class="navbar__actions-home navbar-btn"
            @click="$router.push('/')"
        >
          Главная
        </my-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.navbar {
  display: flex;
  padding: 15px 15px;
  align-items: center;
  background-color: transparent;
  border-bottom: 1px solid teal;
  box-shadow: 2px 2px 4px black;
}

.navbar__actions {
  display: flex;
  flex-direction: row;
  gap: 15px;
  margin-left: auto;
}

.navbar-btn:hover {

}
</style>