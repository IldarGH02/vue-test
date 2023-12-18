<template>
  <li class="post">
    <h2 class="post_title">Название: {{post.title}}</h2>
    <p class="post__text">Описание: {{post.body}}</p>
    <my-button
        class="post__delete"
        @click="$emit('remove',post)"
    >
      Удалить
    </my-button>
  </li>
</template>

<script>

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.post {
  display: flex;
  padding: 15px;
  border: 2px solid teal;
  border-radius: 5px;
  flex-direction: column;
  gap: 15px;
}
</style>